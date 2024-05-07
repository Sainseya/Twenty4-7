<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\OrderProduct;

class PaymentController extends AbstractController
{

    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->em = $entityManager;
    }

    #[Route('/order/create-session-stripe/{reference}', name: 'payment_stripe')]
    public function stripeCheckout($reference): RedirectResponse
    {
        $order = $this->em->getRepository(OrderProduct::class)->findOneBy(['reference' => $reference]);

        // Assurez-vous que $order existe avant de continuer avec le paiement Stripe

        // \Stripe\Stripe::setApiKey('REDACTED_STRIPE_KEY');

        // $session = \Stripe\Checkout\Session::create([
        //     'payment_method_types' => ['card'],
        //     'line_items' => [[
        //         'price' => 'price_1HKiSf2eZvKYlo2CxjF9qwbr',
        //         'quantity' => 1,
        //     ]],
        //     'mode' => 'subscription',
        //     'success_url' => $this->generateUrl('success_url_route', ['session_id' => '{CHECKOUT_SESSION_ID}'], UrlGeneratorInterface::ABSOLUTE_URL),
        //     'cancel_url' => $this->generateUrl('cancel_url_route', [], UrlGeneratorInterface::ABSOLUTE_URL),
        // ]);

        // Redirection vers la page de paiement Stripe
        // return $this->redirect($session->url, 303);
    }
}
