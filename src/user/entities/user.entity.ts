import { CvEntity } from 'src/cv/entities/cv.entity';
import { TimestampEntity } from 'src/cv/entities/generics/timestamp.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => CvEntity, (cv) => cv.user, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  cvs: CvEntity[];
}
