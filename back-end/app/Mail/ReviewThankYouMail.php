<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ReviewThankYouMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data; // Variabel untuk menampung data dari Controller

    // 1. Terima data saat kelas ini dipanggil
    public function __construct($data)
    {
        $this->data = $data;
    }

    // 2. Set Subjek Email
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Terima Kasih atas Ulasan Anda di MarketPlace',
        );
    }

    // 3. Pilih View HTML yang akan dikirim
    public function content(): Content
    {
        return new Content(
            view: 'emails.review_thankyou', // Kita akan buat file ini di Langkah 3
        );
    }
}