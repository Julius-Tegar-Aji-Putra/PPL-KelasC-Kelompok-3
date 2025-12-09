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

    public function __construct($recipientEmail, Mailable $mailObject)
    {
        $this->recipientEmail = $recipientEmail;
        $this->mailObject = $mailObject;
    }

    public function handle(): void
    {
        Mail::to($this->recipientEmail)->send($this->mailObject);
    }
}