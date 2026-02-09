import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
    name:"files",
})
export class File {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    url: string

    @Column({
        nullable: true
    })
    publicId: string
}