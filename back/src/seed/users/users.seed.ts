import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { usersMock } from "./users.mock";



@Injectable()
export class UsersSeed {
    constructor(@InjectRepository(Users) private readonly userRepository: Repository<Users>) { }

    async seedUsers() {
        for (const user of usersMock) {

            const existingUser = await this.userRepository.findOne({ where: { email: user.email } })

            if (!existingUser) {
                const hashedPassword = await bcrypt.hash(user.password, 10)

                await this.userRepository.save({
                    ...user,
                    password: hashedPassword
                })
            }
        }
    }
}