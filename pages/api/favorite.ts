import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from "@/libs/prismadb"
import serverAuth from "@/libs/serverAuth"
import { without } from 'lodash'

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req);
      const { movieId } = req.body;
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      })
      if (!existingMovie) {
        throw new Error('invalid id')
      }
      const UpdateUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        }, 
        data: {
          favoriteIds: {
            push: movieId,
          }
        }
      })
      return res.status(200).json(UpdateUser);
    }

    if (req.method === 'DELETE') {
      const { currentUser } = await serverAuth(req);

      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      })

      if (!existingMovie) {
        throw new Error('invalid id')
      }

      const updateFavoriteIds = without(currentUser.favoriteIds, movieId)
      const updateUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        }, 
        data: {
          favoriteIds: updateFavoriteIds,
        }
      })
      return res.status(200).json(updateUser);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}

