const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Agrega la librería jsonwebtoken
const User = require('../models/User');

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar el token JWT
    const token = jwt.sign({ username: user.username, userId: user._id }, 'secret_key', {
      expiresIn: '1h', // Tiempo de expiración del token
    });

    // Si las credenciales son válidas, retorna el token
    return res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    // Encripta la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario con la contraseña encriptada
    const newUser = new User({ username, password: hashedPassword });

    // Guarda el nuevo usuario en la base de datos
    const user = await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
