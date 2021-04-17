import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSubscribeDto } from './dto/user-subscribe.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  //Inscrire un utilisateur
  async register(userSubscribeDto: UserSubscribeDto) {
    //generate the salt to hash the password with bcrypt
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(userSubscribeDto.password, salt);

    //create a user from the repository  it's equal to  const user=new UserEntity(...)
    //make the hased password and the salt to unhash the password
    const user = this.userRepository.create({
      ...userSubscribeDto,
      salt,
      password,
    });

    //save the user to the database
    try {
      await this.userRepository.save(user);
      delete user.salt;
      return user;
    } catch (e) {
      throw new ConflictException('Username or Email already exists');
    }
  }

  //Login un user
  async login(loginCredentials: LoginCredentialsDto) {
    //get the user by the username
    const user = await this.userRepository.findOne({
      username: loginCredentials.username,
    });

    //Check if the user exist
    if (!user) {
      throw new UnauthorizedException('Invalid Username');
    }

    //hash the password
    const password = await bcrypt.hash(loginCredentials.password, user.salt);

    //check if it's equal to the password of our user
    if (password !== user.password) {
      throw new UnauthorizedException('Invalid Password');
    }

    return user;
  }
}
