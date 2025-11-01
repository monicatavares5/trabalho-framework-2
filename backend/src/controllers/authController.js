import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Usuario } from '../models/usuario.js';

const { JWT_SECRET = "se é louco" } = process.env;

export class AuthController {

    async signUp(req, res) {
        try {
            const { nome, email, senha } = req.body;

            if (!nome || !email || !senha) {
                return res.status(400).json({
                    code: 400,
                    message: "Todos os campos são obrigatórios"
                });
            }

            const userExists = await Usuario.findOne({ where: { email } });
            if (userExists) {
                return res.status(409).json({
                    code: 409,
                    message: "Usuário já existente"
                });
            }

            const senhaHash = await bcrypt.hash(senha, 10);

            const newUser = await Usuario.create({
                nome,
                email,
                senha: senhaHash
            });

            return res.status(201).json({ 
                message: "Usuário criado com sucesso",
                usuario: {
                    id: newUser.id,
                    nome: newUser.nome,
                    email: newUser.email
                }
            });
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao criar usuário",
                error: error.message
            });
        }
    }

    async signIn(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({
                    code: 400,
                    message: "Todos os campos são obrigatórios"
                });
            }

            const userData = await Usuario.findOne({ where: { email } });
            if (!userData) {
                return res.status(401).json({
                    code: 401,
                    message: "Email ou senha incorretos"
                });
            }

            const isValidHash = await bcrypt.compare(senha, userData.senha);
            if (!isValidHash) {
                return res.status(401).json({
                    code: 401,
                    message: "Email ou senha incorretos"
                });
            }

            const accessToken = jwt.sign(
                { id: userData.id, nome: userData.nome, email: userData.email },
                JWT_SECRET,
                { expiresIn: '8h' }
            );

            return res.status(200).json({
                message: "Acesso autorizado", 
                data: {
                    id: userData.id,
                    nome: userData.nome,
                    email: userData.email,
                    accessToken: accessToken
                }
            });
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao fazer login",
                error: error.message
            });
        }
    }
}
