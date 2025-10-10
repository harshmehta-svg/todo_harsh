// New file
import express from 'express';
import { protect, authenticate } from './authMiddleware';
import { userRole, roles } from './utils/consts';

const router = express.Router();

router.use('/api/*', authenticate);

router.get('/admin/dashboard', protect, userRole(roles.ADMIN), (req, res) => {
    res.json({ message: "Admin dashboard" });
});

router.get('/admin/stats', protect, userRole(roles.ADMIN), (req, res) => {
    res.json({ message: "Admin statistics" });
});

router.get('/api/*', protect);

router.get('/public', (req, res) => {
    res.json({ message: "Public route" });
});

export default router;