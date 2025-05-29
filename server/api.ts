import express from 'express';
import { database } from '~/database/context';
import * as schema from '~/database/schema';
import { eq } from 'drizzle-orm';
 import {executeJSSnippet} from './utils/jsSnippet';


const router = express.Router();

//Snippet Data


router.post('/jssnippet', async (req, res) => {
    const { name, jsSnippet } = req.body;
    const db = database();

    // const result = executeJSSnippet(jsSnippet);
    try {
        await db.insert(schema.JSSnippet).values({ name, jsSnippet });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: `Error adding snippet ${error}`,  });
    }
});

router.get('/jssnippets', async (req, res) => {
    const db = database();
    try {
        const snippets = await db.query.JSSnippet.findMany();
        res.json(snippets);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching snippets' });
    }
});

router.get('/jssnippet/:snippetId', async (req, res) => {
    const { snippetId } = req.params;
    const db = database();
    try {
        const snippet = await db.query.JSSnippet.findFirst({ where: eq(schema.JSSnippet.id, parseInt(snippetId)) });
        const result = executeJSSnippet(snippet?.jsSnippet);
        const response = { ...snippet, result };
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: `Error fetching snippet:${error}`});
    }
});






export default router;