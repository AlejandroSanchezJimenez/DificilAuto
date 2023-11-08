<?php

namespace App\Repository;

use App\Entity\Examen;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Examen>
 *
 * @method Examen|null find($id, $lockMode = null, $lockVersion = null)
 * @method Examen|null findOneBy(array $criteria, array $orderBy = null)
 * @method Examen[]    findAll()
 * @method Examen[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ExamenRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Examen::class);
    }

    public function findExamByUserDif($id, $dif)
    {
        $conn = $this->getEntityManager()
            ->getConnection();
            $sql = "SELECT * FROM examen e
            JOIN examen_usuario eu ON e.id = eu.examen_id
            JOIN usuario u ON eu.usuario_id = u.id
            LEFT JOIN dificultad d ON e.dificultad_id = d.id
            WHERE u.email = '$id' AND e.dificultad_id = '$dif'"; 



        $stmt = $conn->prepare($sql);
        $result = $stmt->executeQuery();
        return $result->fetchAllAssociative();
    }

    public function findExamByUserCat($id)
    {
        $conn = $this->getEntityManager()
            ->getConnection();
            $sql = "SELECT * FROM examen e
            JOIN examen_usuario eu ON e.id = eu.examen_id
            JOIN usuario u ON eu.usuario_id = u.id
            LEFT JOIN categoria c ON e.categoria_id = c.id
            WHERE u.email = '$id' AND e.categoria_id is not null"; 



        $stmt = $conn->prepare($sql);
        $result = $stmt->executeQuery();
        return $result->fetchAllAssociative();
    }
    //    /**
    //     * @return Examen[] Returns an array of Examen objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('e')
    //            ->andWhere('e.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('e.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Examen
    //    {
    //        return $this->createQueryBuilder('e')
    //            ->andWhere('e.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
