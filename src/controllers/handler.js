import { v4 as uuidv4 } from 'uuid';
import books from '../Books/books.js';

const tambahBuku = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const id = uuidv4();
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const finished = pageCount === readPage;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id
        },
    });
    response.code(201);
    return response;
};

const mendapatkanBuku = (request, h) => {
    const { name, reading, finished } = request.query;
    let filteredBooks = books;
  
    if (name) {
      filteredBooks = filteredBooks.filter((book) =>
        book.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (reading !== undefined) {
      filteredBooks = filteredBooks.filter((book) => book.reading === (reading === '1'));
    }

    if (finished !== undefined) {
      filteredBooks = filteredBooks.filter((book) => book.finished === (finished === '1'));
    }

    return h.response({
      status: 'success',
      data: {
        books: filteredBooks.length > 0
          ? filteredBooks.map(({ id, name, publisher }) => ({ id, name, publisher }))
          : [],
      },
    }).code(200);
};

const mendapatkanBukuById = (request, h) => {
    const { bookId } = request.params;  
    const book = books.find((b) => b.id === bookId);  

    if (book) {
        return h.response({
            status: 'success',
            data: {
                book,  
            },
        }).code(200);
    }

    return h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    }).code(404);  
};

const updateBuku = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    const index = books.findIndex((b) => b.id === bookId);
    if (index === -1) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        }).code(404);
    }

    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();
    books[index] = {
        ...books[index],
        name, year, author, summary, publisher, pageCount, readPage, reading, finished, updatedAt
    };

    return h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    }).code(200);
};

const hapusBuku = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((b) => b.id === bookId);
    if (index === -1) {
        return h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        }).code(404);
    }

    books.splice(index, 1);

    return h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    }).code(200);
};

export { tambahBuku, mendapatkanBukuById, mendapatkanBuku, updateBuku, hapusBuku };
