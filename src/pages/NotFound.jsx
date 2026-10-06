import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Home, ArrowLeft } from 'lucide-react';
import { Container } from '../components/ui/Container';

export const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <Container className="text-center max-w-md space-y-6">
        <div className="text-6xl font-black text-ngo-gold-700">404</div>
        <h1 className="text-2xl font-bold text-slate-900">
          पृष्ठ नहीं मिला / Page Not Found
        </h1>
        <p className="text-sm text-slate-600">
          आप जिस पृष्ठ की तलाश कर रहे हैं वह उपलब्ध नहीं है या हटा दिया गया है।
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <NavLink to="/">
            <Button variant="primary" icon={Home}>
              मुख्य पृष्ठ (Home)
            </Button>
          </NavLink>
        </div>
      </Container>
    </div>
  );
};
