<?php

namespace App\Entity;

use App\Repository\CartRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: CartRepository::class)]
class Cart
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: "datetime")]
    private ?\DateTimeInterface $creation_date = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[ORM\JoinColumn(name: "user_id", referencedColumnName: "id")]
    private $user;

    #[ORM\Column(nullable: true)]
    private ?int $orderID = null;

    private ?Collection $items = null;

    public function __construct()
    {
        // Initialisez $items à une ArrayCollection vide dans le constructeur
        $this->items = new ArrayCollection();
    }

    public function setItem(CartProduct $item): self
    {
        if ($this->items === null) {
            $this->items = new ArrayCollection();
        }

        if (!$this->items->contains($item)) {
            $this->items[] = $item;
            $item->setCart($this);
        }

        return $this;
    }

    public function getItems(): ?Collection
    {
        return $this->items;
    }
    public function getItem($productId)
{
    try {
        if ($this->items !== null) {
            foreach ($this->items as $cartProduct) {
                if ($cartProduct->getProduct()->getId() === $productId) {
                    return $cartProduct;
                }
            }
        }
    } catch (\Exception $e) {
        return null;
    }

    return null;
}


    public function removeItem(CartProduct $itemToRemove): void
    {
        $this->items->removeElement($itemToRemove);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): self
    {
        $this->id = $id;

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

    public function getOrderID(): ?int
    {
        return $this->orderID;
    }

    public function setOrderID(?int $orderID): self
    {
        $this->orderID = $orderID;

        return $this;
    }
}