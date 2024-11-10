import { tambahBuku, mendapatkanBukuById, mendapatkanBuku, updateBuku, hapusBuku } from "../controllers/handler.js";

const routes = [
    {
       method: 'POST',
       path: '/books',
       handler: tambahBuku,
    },
    {
      method: 'GET',
      path: '/books',
      handler: mendapatkanBuku,
    },
    {
       method: 'GET',
       path: '/books/{bookId}',
       handler: mendapatkanBukuById,
    },
    {
       method: 'PUT',
       path: '/books/{bookId}',
       handler: updateBuku,
    },
    {
       method: 'DELETE',
       path: '/books/{bookId}',
       handler: hapusBuku,
    }
];

export default routes;
