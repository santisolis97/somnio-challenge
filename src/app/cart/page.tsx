import { Suspense } from 'react';
import { Cart } from '../_components/Cart';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Cart />
    </Suspense>
  );
}
