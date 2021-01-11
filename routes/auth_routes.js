const {Router} = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const config = require("config")
const User = require("../models/User")
const router = Router()

// /api/auth/registration
router.post(
    "/registration",
    [
        check("username", "Name некорректно").isString(),
        check("email", "Email некорректно").isEmail(),
        check("password", "Password должен состоять из 8 символов").isLength({ min: 8 })
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при входе"
                })
            }

            const {username, email, password} = request.body

            const candidateEmail = await User.findOne( {email} )
            const candidateName = await User.findOne( {username} )

            if (candidateEmail) {
                response.status(400).json({ message: "Пользователь с таким Email уже сущесвтует" })
            }

            if (candidateName) {
                response.status(400).json({ message: "Пользователь с таким Name уже сущесвтует" })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ username, email, password: hashedPassword })

            await user.save()

            response.status(201).json({ message: "User создан" })

        } catch (event) {
            response.status(500).json({ message: "Что то пошло не так :(" })
        }
})

// /api/auth/login
router.post(
    "/login",
    [
        check("username", "Name некорректно").isString(),
        check("email", "Email некорректно").normalizeEmail().isEmail(),
        check("password", "Неверный Password").exists()
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request)

            if (!errors.isEmpty()) {
                return response.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при регистрации"
                })
            }

            const {username, email, password} = request.body

            const user = await User.findOne({ username })

            if (!user) {
                return response.status(400).json({ message: "Неверные данные (username)" })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return response.status(400).json({ message: "Неверные данные (password)" })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get("jwtSecret"),
                {expiresIn: "1h"}
            )

            response.json({ token, userId: user.id })

        } catch (event) {
            response.status(500).json({ message: "Что то пошло не так :(" })
        }
})


module.exports = router