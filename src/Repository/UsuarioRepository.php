<?php

namespace App\Repository;

use App\Entity\Usuario;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;

/**
 * @extends ServiceEntityRepository<Usuario>
 * @implements PasswordUpgraderInterface<Usuario>
 *
 * @method Usuario|null find($id, $lockMode = null, $lockVersion = null)
 * @method Usuario|null findOneBy(array $criteria, array $orderBy = null)
 * @method Usuario[]    findAll()
 * @method Usuario[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UsuarioRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Usuario::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof Usuario) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', $user::class));
        }

        $user->setPassword($newHashedPassword);
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();
    }

    /**
     * @return Usuario[] Returns an array of Usuario objects
     */
    public function findNoVerified(): array
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.isVerified = :val')
            ->setParameter('val', '0')
            ->getQuery()
            ->getResult();
    }

    /**
     * @return Usuario[] Returns an array of Usuario objects
     */
    public function findUsers(): array
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.roles like :val')
            ->setParameter('val', '%"ROLE_USER"%')
            ->getQuery()
            ->getResult();
    }

    public function remove(Usuario $usuario)
    {
        return $this->createQueryBuilder('u')
            ->delete(Usuario::class, 'u')
            ->andWhere('u.id = :id')
            ->setParameter('id', $usuario->getId())
            ->getQuery()
            ->execute();
    }

    public function findOneByEmail($value): ?Usuario
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.Email = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
