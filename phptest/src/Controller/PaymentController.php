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

    public function apiCharge(Request $request, OrderRepository $orderRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $order = $orderRepository->find($data['orderId']);
        $customerId = $data['customerId'] ?? null;

        if (!$order) {
            return new JsonResponse(['error' => 'Order not found'], 404);
        }

        $totalAmount = $order->getTotalPrice();

        Stripe::setApiKey($_ENV['STRIPE_SECRET_KEY']);

        $chargeParams = [
            'amount' => $totalAmount * 100,
            'currency' => 'eur',
            'description' => 'Paiement de commande',
        ];

        if ($customerId !== null) {
            $chargeParams['customer'] = $customerId;
        }

        try {
            $charge = Charge::create($chargeParams);

            // If the charge is successful, update the payment status of the order
            if ($charge) {
                $order->setPaymentStatus('Done');
                $entityManager->persist($order);
                $entityManager->flush();
            }

            return new JsonResponse(['success' => 'Paiement effectué avec succès', 'charge' => $charge]);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        }
    }
}
