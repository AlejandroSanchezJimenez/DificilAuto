<?php

namespace App\Repository;

use App\Entity\Intento;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Intento>
 *
 * @method Intento|null find($id, $lockMode = null, $lockVersion = null)
 * @method Intento|null findOneBy(array $criteria, array $orderBy = null)
 * @method Intento[]    findAll()
 * @method Intento[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class IntentoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Intento::class);
    }

//    /**
//     * @return Intento[] Returns an array of Intento objects
//     */
   public function findByExamenIDUs($ex,$id): array
   {
       return $this->createQueryBuilder('i')
           ->andWhere('i.idExamen = :val')
           ->andWhere('i.idAlumno = :val2')
           ->setParameter('val', $ex)
           ->setParameter('val2', $id)
           ->getQuery()
           ->getResult()
       ;
   }

//    public function findOneBySomeField($value): ?Intento
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
