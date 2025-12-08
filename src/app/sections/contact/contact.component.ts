import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9+\-\s()]*$/)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    // Initialize EmailJS with your public key
    emailjs.init('scVkZRz_hdiwYWO6m'); // Replace with your EmailJS public key
  }

  get f() {
    return this.contactForm.controls;
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.controls[key].markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    try {
      const templateParams = {
        from_name: this.contactForm.value.name,
        from_email: this.contactForm.value.email,
        phone: this.contactForm.value.phone || 'N/A',
        message: this.contactForm.value.message
      };

      // Replace with your EmailJS service ID and template ID
      await emailjs.send(
        'service_5kofq8g',
        'template_fo123d6',
        templateParams
      );

      this.submitSuccess = true;
      this.contactForm.reset();
      
      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      this.submitError = true;
      
      setTimeout(() => {
        this.submitError = false;
      }, 5000);
    } finally {
      this.isSubmitting = false;
    }
  }
}
