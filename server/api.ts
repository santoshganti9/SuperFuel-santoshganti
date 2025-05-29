import express from 'express';
import { database } from '~/database/context';
import * as schema from '~/database/schema';
import { eq } from 'drizzle-orm';
import type {TSalesData} from "../interfaces/asins";


const router = express.Router();

//ASIN Data

router.post('/asin', async (req, res) => {
    const { name, email, asin, category  } = req.body;
    const db = database();
    try {
        await db.insert(schema.ASINs).values({ name, email, asin, category });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error adding ASIN' });
    }
});

router.put('/asin/:asin', async (req, res) => {
    const { name, email, category  } = req.body;
    const {asin} = req.params;

    let updated_asin: any={};
    if (name) {
        updated_asin.name = name;
    }
    if (email) {
        updated_asin.email = email;
    }
    if (category) {
        updated_asin.category = category;
    }
    const db = database();
    try {
        await db.update(schema.ASINs).set({ ...updated_asin }).where(eq(schema.ASINs.asin, asin));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error updating ASIN' });
    }
});

router.delete('/asin/:asin', async (req, res) => {
    const {asin} = req.params;
    const db = database();
    try {
        await db.delete(schema.ASINs).where(eq(schema.ASINs.asin, asin));
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting ASIN' });
    }
});

router.get('/asins', async (req, res) => {
    const db = database();
    try {
        const asins = await db.query.ASINs.findMany();
        res.json(asins);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching ASINs' });
    }
});

//Sales Data


router.post('/sales/:asin', async (req, res) => {
    const{sales_data}:{sales_data:TSalesData[]} = req.body;
    const {asin} = req.params;
    const db = database();

    try {
        const salesValues = sales_data.map(({ sales_count, date }) => ({ asin, sales_count, date }));
        await db.insert(schema.sales).values(salesValues);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Error adding sales' });
    }
});

router.get('/sales/:asin', async (req, res) => {
    const {asin} = req.params;
    const db = database();
    try {
        const sales = await db.query.sales.findMany({where: eq(schema.sales.asin, asin)});
        res.json(sales);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching sales' });
    }
})





export default router;