<?php

namespace App\Repository;

use App\Entity\Categoria;
use App\Entity\Pregunta;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Pregunta>
 *
 * @method Pregunta|null find($id, $lockMode = null, $lockVersion = null)
 * @method Pregunta|null findOneBy(array $criteria, array $orderBy = null)
 * @method Pregunta[]    findAll()
 * @method Pregunta[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PreguntaRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Pregunta::class);
    }

    public function toArray(Pregunta $pregunta): array
    {
        return array(
            "id" => $pregunta->getId(),
            "enunciado" => $pregunta->getEnunciado(),
            "opc1" => $pregunta->getOpc1(),
            "opc2" => $pregunta->getOpc2(),
            "opc3" => $pregunta->getOpc3(),
            "correcta" => $pregunta->getCorrecta(),
            "url" => $pregunta->getUrl(),
            "urltype" => $pregunta->getUrlType(),
            "idCategoria" => $pregunta->getIdCategoria(),
            "idDificultad" => $pregunta->getIdDificultad()
        );
    }

//    /**
//     * @return Pregunta[] Returns an array of Pregunta objects
//     */
   public function findByCategoria($value): array
   {
       return $this->createQueryBuilder('p')
           ->andWhere('p.idCategoria = :val')
           ->setParameter('val', $value)
           ->orderBy('p.id', 'ASC')
           ->getQuery()
           ->getResult()
       ;
   }

   public function findByDif($dif)
   {
       $conn = $this->getEntityManager()
           ->getConnection();
       $sql = 'select * from pregunta where id_dificultad_id='.$dif.' order by rand() limit 10';
       $stmt = $conn->prepare($sql);
       $result = $stmt->executeQuery();
       return $result->fetchAllAssociative();
   }

//    public function findOneBySomeField($value): ?Pregunta
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
