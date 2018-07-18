import {Router} from 'express'

const router = new Router()

router.get('/ping', (req, res) => {
  res.send('pong')
})

export default router