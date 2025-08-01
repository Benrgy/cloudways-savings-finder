import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEmailSubscription } from '@/hooks/useEmailSubscription';
import { useLanguage } from '@/contexts/LanguageContext';
export const NewsletterSignupForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const {
    subscribe,
    isSubscribing
  } = useEmailSubscription();
  const {
    t
  } = useLanguage();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      subscribe({
        email,
        name: name || undefined,
        source: 'newsletter'
      });
      setEmail('');
      setName('');
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubscribing || !email}
        className="w-full"
      >
        {isSubscribing 
          ? 'Subscribing...' 
          : 'Subscribe to Newsletter'
        }
      </Button>
    </form>
  );
};