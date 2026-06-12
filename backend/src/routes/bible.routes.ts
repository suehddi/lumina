import { Router, Request, Response } from 'express';
import { pool } from '../index';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// 📖 GET /api/bible/versions - Listar todas as versões da Bíblia
router.get('/versions', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT id, name, abbreviation, language, year FROM bible_versions ORDER BY name'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar versões' });
  }
});

// 📖 GET /api/bible/books/:versionId - Listar todos os livros da Bíblia
router.get('/books/:versionId', async (req: Request, res: Response) => {
  try {
    const { versionId } = req.params;
    const result = await pool.query(
      `SELECT id, name, book_number, testament, chapters 
       FROM bible_books 
       WHERE version_id = $1 
       ORDER BY book_number`,
      [versionId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

// 📖 GET /api/bible/verses/:bookId/:chapter - Buscar versículos de um capítulo
router.get('/verses/:bookId/:chapter', async (req: Request, res: Response) => {
  try {
    const { bookId, chapter } = req.params;
    const result = await pool.query(
      `SELECT id, verse_number, text, book_id, chapter 
       FROM bible_verses 
       WHERE book_id = $1 AND chapter = $2 
       ORDER BY verse_number`,
      [bookId, chapter]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar versículos' });
  }
});

// 📖 GET /api/bible/search - Buscar versículos por palavra-chave
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q, versionId, limit = 50 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Parâmetro de busca obrigatório' });
    }

    const result = await pool.query(
      `SELECT v.id, v.text, v.verse_number, v.chapter, b.name as book_name, bv.abbreviation
       FROM bible_verses v
       JOIN bible_books b ON v.book_id = b.id
       JOIN bible_versions bv ON b.version_id = bv.id
       WHERE (v.text ILIKE $1 OR b.name ILIKE $1)
       ${versionId ? 'AND bv.id = $2' : ''}
       LIMIT $${versionId ? 3 : 2}`,
      versionId ? [%${q}%, versionId, limit] : [%${q}%, limit]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro na busca' });
  }
});

// 📖 GET /api/bible/:bookId/:chapter/:verse - Obter versículo específico
router.get('/:bookId/:chapter/:verse', async (req: Request, res: Response) => {
  try {
    const { bookId, chapter, verse } = req.params;
    
    const result = await pool.query(
      `SELECT v.id, v.text, v.verse_number, v.chapter, b.name as book_name, b.testament
       FROM bible_verses v
       JOIN bible_books b ON v.book_id = b.id
       WHERE v.book_id = $1 AND v.chapter = $2 AND v.verse_number = $3`,
      [bookId, chapter, verse]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Versículo não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar versículo' });
  }
});

// 💾 POST /api/bible/favorites - Salvar versículo favorito
router.post('/favorites', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const { verseId } = req.body;

    const result = await pool.query(
      `INSERT INTO user_favorites (user_id, verse_id, created_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT DO NOTHING
       RETURNING *`,
      [userId, verseId]
    );

    res.status(201).json({ message: 'Versículo adicionado aos favoritos', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar favorito' });
  }
});

// 📖 GET /api/bible/favorites/:userId - Listar favoritos do usuário
router.get('/favorites/:userId', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT v.id, v.text, v.verse_number, v.chapter, b.name as book_name
       FROM user_favorites uf
       JOIN bible_verses v ON uf.verse_id = v.id
       JOIN bible_books b ON v.book_id = b.id
       WHERE uf.user_id = $1
       ORDER BY uf.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar favoritos' });
  }
});

export default router;
