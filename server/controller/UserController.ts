import { NextFunction, Request, Response } from 'express'
import { PostgresDataSource } from '../utils/data-source'
import { User } from '../entity/User'

export class UserController {
  private userRepository = PostgresDataSource.getRepository(User)

  constructor() {
    this.register = this.register.bind(this)
    this.all = this.all.bind(this)
    this.one = this.one.bind(this)
    this.remove = this.remove.bind(this)
  }

  async register(request: Request, response: Response, next: NextFunction) {
    const { username, email, password } = request.body

    const existingUser = await this.userRepository.findOne({ where: { email } })
    if (existingUser) {
      return response
        .status(400)
        .json({ error: 'User with the provided email already exists' })
    }

    const user = new User()
    user.username = username
    user.email = email
    user.setPassword(password)

    await this.userRepository.save(user)

    return response
      .status(201)
      .json({ message: 'User registered successfully' })
  }

  async all(request: Request, response: Response, next: NextFunction) {
    const users = await this.userRepository.find()
    return response.json(users)
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id

    const user = await this.userRepository.findOneBy({ id: parseInt(id) })
    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }
    return response.json(user)
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id

    let userToRemove = await this.userRepository.findOneBy({ id: parseInt(id) })
    if (!userToRemove) {
      return response.status(404).json({ error: 'User not found' })
    }

    await this.userRepository.remove(userToRemove)
    return response.status(200).json({ message: 'User removed successfully' })
  }
}
