<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Contracts\Mail\Mailable; 

class SendEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $recipientEmail;
    protected $mailObject;

    /**
     * Create a new job instance.
     * Menerima email tujuan dan Objek Mail (Mailable) apa saja.
     */
    public function __construct($recipientEmail, Mailable $mailObject)
    {
        $this->recipientEmail = $recipientEmail;
        $this->mailObject = $mailObject;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->recipientEmail)->send($this->mailObject);
    }
}