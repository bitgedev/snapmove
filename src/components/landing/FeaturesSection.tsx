import { Dumbbell, Timer, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Dumbbell,
    title: '루틴 빌더',
    description:
      '나만의 운동 루틴을 만들고 관리하세요. 근육군별로 정리된 운동 목록으로 효율적인 프로그램을 구성할 수 있습니다.',
  },
  {
    icon: Timer,
    title: '운동 트래커',
    description:
      '세트별 무게와 반복 횟수를 실시간으로 기록하세요. 이전 기록과 비교하며 꾸준한 성장을 확인할 수 있습니다.',
  },
  {
    icon: Share2,
    title: '공유 카드 생성',
    description:
      '운동 완료 후 인스타그램용 카드를 즉시 생성하세요. 나의 성과를 아름답게 공유할 수 있습니다.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-brand-bg px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 md:text-3xl">
          운동 기록의 모든 것
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="border border-brand-border bg-white shadow-sm"
            >
              <CardContent className="p-6">
                <div className="mb-4 inline-flex rounded-xl bg-brand-bg p-3">
                  <Icon className="size-6 text-brand-button" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{title}</h3>
                <p className="text-sm break-keep leading-relaxed text-gray-500">
                  {description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
