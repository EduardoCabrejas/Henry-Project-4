import { AppDataSource } from "../config/dataSource";
import { Credential } from "../entities/Credential";

export const CredentialRepository = AppDataSource.getRepository(Credential);