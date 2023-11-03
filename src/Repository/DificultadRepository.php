<?php

namespace App\Repository;

use App\Entity\Dificultad;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Dificultad>
 *
 * @method Dificultad|null find($id, $lockMode = null, $lockVersion = null)
 * @method Dificultad|null findOneBy(array $criteria, array $orderBy = null)
 * @method Dificultad[]    findAll()
 * @method Dificultad[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DificultadRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Dificultad::class);
    }

//    /**
//     * @return Dificultad[] Returns an array of Dificultad objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('d.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Dificultad
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
