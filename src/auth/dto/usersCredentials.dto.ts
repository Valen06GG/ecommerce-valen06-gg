import { PickType } from "@nestjs/swagger";
import { SignUpDto } from "./signup.dto";

export class UserCredentialsDto extends PickType(SignUpDto, [ 
    "email", 
    "password",
]) {}
