import express from 'express';
import {createAgentUser, listAgentUser} from '../controller/agentController.js';
const router = express.Router();

// Create Agents 
router.post('/', createAgentUser)

// List Agents
router.get('/', listAgentUser);

export default router;