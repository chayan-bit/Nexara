import { Hero } from '@/components/sections/hero';
import { Problem } from '@/components/sections/problem';
import { Layers } from '@/components/sections/layers';
import { Personas } from '@/components/sections/personas';
import { GoldenThread } from '@/components/sections/golden-thread';
import { Trust } from '@/components/sections/trust';
import { BusinessModel } from '@/components/sections/business-model';
import { Roadmap } from '@/components/sections/roadmap';
import { Cta } from '@/components/sections/cta';

export default function Page() {
  return (
    <>
      <Hero />
      <Problem />
      <Layers />
      <Personas />
      <GoldenThread />
      <Trust />
      <BusinessModel />
      <Roadmap />
      <Cta />
    </>
  );
}
