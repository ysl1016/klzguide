import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, ArrowRight, Lightbulb, AlertTriangle } from 'lucide-react';

export default async function BeginnerIntroPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BeginnerIntroContent locale={locale} />;
}

function BeginnerIntroContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  const factions = [
    {
      name: l('블러디 로즈', 'Blood Rose', 'Blood Rose'),
      style: l('공격적인 플레이 스타일', 'Phong cách tấn công', 'Aggressive playstyle'),
      recommend: l('공격 위주 플레이어', 'Người chơi ưa tấn công', 'Offense-focused players'),
      color: 'text-red-400',
    },
    {
      name: l('새벽의 날개', 'Cánh Bình Minh', 'Wings of Dawn'),
      style: l('밸런스 잡힌 능력치', 'Chỉ số cân bằng', 'Balanced stats'),
      recommend: l('초보자 추천', 'Khuyến nghị cho người mới', 'Recommended for beginners'),
      color: 'text-blue-400',
    },
    {
      name: l('질서의 수호자', 'Người Bảo Vệ Trật Tự', 'Guard of Order'),
      style: l('방어적인 플레이 스타일', 'Phong cách phòng thủ', 'Defensive playstyle'),
      recommend: l('방어 위주 플레이어', 'Người chơi ưa phòng thủ', 'Defense-focused players'),
      color: 'text-yellow-400',
    },
  ];

  const steps = [
    {
      step: 1,
      title: l('튜토리얼 완료', 'Hoàn thành hướng dẫn', 'Complete the Tutorial'),
      desc: l(
        '게임 시작 후 튜토리얼을 끝까지 완료하세요. 기본적인 시스템 이해와 보상을 얻을 수 있습니다.',
        'Sau khi bắt đầu game, hãy hoàn thành hướng dẫn. Bạn sẽ hiểu hệ thống cơ bản và nhận phần thưởng.',
        'Complete the tutorial after starting the game. You\'ll learn the basic systems and earn rewards.'
      ),
    },
    {
      step: 2,
      title: l('본부(HQ) 레벨업', 'Nâng cấp HQ', 'Level Up Your HQ'),
      desc: l(
        '본부(HQ) 레벨이 다른 건물의 레벨 상한을 결정합니다. 가능한 빠르게 본부(HQ)를 레벨업하세요.',
        'Cấp HQ quyết định giới hạn cấp của các công trình khác. Hãy nâng cấp HQ nhanh nhất có thể.',
        'Your HQ level determines the level cap for other buildings. Level up your HQ as fast as possible.'
      ),
    },
    {
      step: 3,
      title: l('연맹 가입', 'Tham gia liên minh', 'Join an Alliance'),
      desc: l(
        '연맹에 가입하면 건설 시간 단축 도움, 연맹 상점 이용 등 다양한 혜택을 받을 수 있습니다.',
        'Khi tham gia liên minh, bạn được nhận nhiều lợi ích như hỗ trợ rút ngắn thời gian xây dựng, sử dụng cửa hàng liên minh.',
        'Joining an alliance gives you construction speed help, access to the alliance shop, and many other benefits.'
      ),
    },
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-beginner">
              {t('difficulty.beginner')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              10 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold">
            {l('게임 소개', 'Giới thiệu game', 'Game Introduction')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              'Last Z: Survival Shooter의 기본 시스템과 게임 방법을 알아봅니다.',
              'Tìm hiểu hệ thống cơ bản và cách chơi của Last Z: Survival Shooter.',
              'Learn the basic systems and gameplay of Last Z: Survival Shooter.'
            )}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{l('핵심 요약', 'Tóm tắt', 'TL;DR')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                •{' '}
                {l(
                  'Last Z는 좀비 아포칼립스 배경의 전략 RPG 게임입니다',
                  'Last Z là game chiến thuật RPG với bối cảnh zombie apocalypse',
                  'Last Z is a strategy RPG set in a zombie apocalypse'
                )}
              </li>
              <li>
                •{' '}
                {l(
                  '기지를 건설하고 영웅을 육성하며 생존자를 이끄세요',
                  'Xây dựng căn cứ, phát triển anh hùng và dẫn dắt những người sống sót',
                  'Build your base, develop heroes, and lead survivors'
                )}
              </li>
              <li>
                •{' '}
                {l(
                  '연맹에 가입하여 다른 플레이어들과 협력하세요',
                  'Tham gia liên minh để hợp tác với người chơi khác',
                  'Join an alliance and cooperate with other players'
                )}
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Core Systems */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('핵심 시스템', 'Hệ thống cốt lõi', 'Core Systems')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: l('기지 건설', 'Xây dựng căn cứ', 'Base Building'),
                desc: l(
                  'HQ(본부)를 중심으로 다양한 건물을 건설하고 업그레이드합니다',
                  'Xây dựng và nâng cấp các công trình xung quanh Trụ sở (HQ)',
                  'Build and upgrade various structures around your HQ'
                ),
              },
              {
                title: l('영웅 육성', 'Phát triển anh hùng', 'Hero Development'),
                desc: l(
                  '다양한 영웅을 모집하고 레벨업, 스킬 강화를 통해 전투력을 높입니다',
                  'Tuyển mộ anh hùng, nâng cấp level và kỹ năng để tăng sức mạnh',
                  'Recruit heroes, level them up, and enhance skills to boost combat power'
                ),
              },
              {
                title: l('부대 편성', 'Tổ chức đội hình', 'Troop Formation'),
                desc: l(
                  '돌격, 슈터, 라이더 등 병종을 조합하여 최적의 진형을 구성합니다',
                  'Kết hợp các binh chủng như Lính đột kích, Xạ thủ, Kỵ binh',
                  'Combine troop types like Assaulters, Shooters, and Riders for optimal formations'
                ),
              },
              {
                title: l('연맹 활동', 'Hoạt động liên minh', 'Alliance Activities'),
                desc: l(
                  '다른 플레이어들과 연맹을 이루어 대규모 전투에 참여합니다',
                  'Tham gia trận chiến quy mô lớn cùng người chơi khác',
                  'Team up with other players in large-scale battles'
                ),
              },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Factions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('진영 소개', 'Giới thiệu các phe phái', 'Faction Overview')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold">
                    {l('진영', 'Phe phái', 'Faction')}
                  </th>
                  <th className="text-left p-3 font-semibold">
                    {l('특징', 'Đặc điểm', 'Traits')}
                  </th>
                  <th className="text-left p-3 font-semibold">
                    {l('추천', 'Khuyến nghị', 'Recommended For')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {factions.map((faction) => (
                  <tr key={faction.name} className="border-b border-border/50">
                    <td className={`p-3 font-medium ${faction.color}`}>
                      {faction.name}
                    </td>
                    <td className="p-3 text-muted-foreground">{faction.style}</td>
                    <td className="p-3 text-muted-foreground">
                      {faction.recommend}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tip */}
          <div className="info-tip flex gap-3">
            <Lightbulb className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-emerald-400">
                {l('팁', 'Mẹo', 'Tip')}
              </p>
              <p className="text-sm text-muted-foreground">
                {l(
                  '처음 시작하시는 분들은 새벽의 날개 진영을 추천드립니다. 밸런스가 좋아 다양한 상황에 대응하기 쉽습니다.',
                  'Nếu bạn mới bắt đầu, chúng tôi khuyên bạn chọn phe Cánh Bình Minh. Sự cân bằng giúp dễ dàng ứng phó trong nhiều tình huống.',
                  'If you\'re just starting out, we recommend Wings of Dawn. Their balanced stats make it easy to handle various situations.'
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Early Game Steps */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('초반 진행 가이드', 'Hướng dẫn giai đoạn đầu', 'Early Game Guide')}
          </h2>
          <div className="space-y-4">
            {steps.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Warning */}
          <div className="info-warning flex gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-orange-400">
                {l('주의', 'Chú ý', 'Warning')}
              </p>
              <p className="text-sm text-muted-foreground">
                {l(
                  '랜덤 연맹보다는 활동적인 연맹을 찾아 가입하세요. 연맹 활동이 성장에 매우 중요합니다.',
                  'Hãy tìm liên minh hoạt động tích cực thay vì tham gia ngẫu nhiên. Hoạt động liên minh rất quan trọng cho sự phát triển.',
                  'Look for an active alliance instead of joining a random one. Alliance activity is crucial for your growth.'
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('다음 단계', 'Bước tiếp theo', 'Next Steps')}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                title: l('초보자 필수 팁 10가지', '10 mẹo quan trọng cho người mới', '10 Essential Beginner Tips'),
                href: '/beginner/tips',
              },
              {
                title: l('진영 선택 가이드', 'Hướng dẫn chọn phe phái', 'Faction Selection Guide'),
                href: '/beginner/faction',
              },
              {
                title: l('본부(HQ) 업그레이드 가이드', 'Hướng dẫn nâng cấp Trụ sở', 'HQ Upgrade Guide'),
                href: '/progression/hq',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent transition-colors group"
              >
                <span className="font-medium">{item.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
