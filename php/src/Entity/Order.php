<?php

namespace App\Entity;

use App\Repository\OrderRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OrderRepository::class)]
#[ORM\Table(name: '`order`')]
class Order
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    // Replace the orderID field with a User object
    #[ORM\ManyToOne(targetEntity: User::class), ORM\JoinColumn(nullable: false)]
    private $user;

    #[ORM\ManyToOne(targetEntity: Cart::class)]
    #[ORM\JoinColumn(name: "orderID", referencedColumnName: "id")]
    private $cart;

    #[ORM\Column]
    private ?float $totale_price = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $creation_date = null;

    #[ORM\Column]
    private ?bool $is_delivered = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    // Add getter and setter for the User object

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getTotalePrice(): ?float
    {
        return $this->totale_price;
    }

    public function setTotalePrice(float $totale_price): self
    {
        $this->totale_price = $totale_price;

        return $this;
    }

    public function getCreationDate(): ?\DateTimeInterface
    {
        return $this->creation_date;
    }

    public function setCreationDate(\DateTimeInterface $creation_date): self
    {
        $this->creation_date = $creation_date;

        return $this;
    }

    public function isDelivered(): ?bool
    {
        return $this->is_delivered;
    }

    public function setDelivered(bool $is_delivered): self
    {
        $this->is_delivered = $is_delivered;

        return $this;
    }
}