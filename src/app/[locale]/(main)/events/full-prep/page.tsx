import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Timer, Lightbulb, AlertTriangle, Building2, FlaskConical, Wrench, Users, Swords, Gift } from 'lucide-react';

export default async function FullPrepPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FullPrepContent locale={locale} />;
}

function FullPrepContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const themes = [
    {
      name: isKorean ? '건물 업그레이드' : 'Shelter Upgrade',
      icon: Building2,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      activities: [
        { action: isKorean ? 'Structure power +10 증가' : 'Tăng 10 Structure power', points: '1pt' },
        { action: isKorean ? '건설 가속 1분당' : '1 phút tăng tốc xây', points: '10pt' },
      ],
    },
    {
      name: isKorean ? '과학의 시대' : 'Age of Science',
      icon: FlaskConical,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      activities: [
        { action: isKorean ? 'Tech power +10 증가' : 'Tăng 10 Tech power', points: '1pt' },
        { action: isKorean ? '연구 가속 1분당' : '1 phút tăng tốc NC', points: '10pt' },
      ],
    },
    {
      name: isKorean ? '차량 개조' : 'Mod Vehicle Boost',
      icon: Wrench,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      activities: [
        { action: isKorean ? '청사진 소모' : 'Tiêu thụ Blueprint', points: '4pt' },
        { action: isKorean ? '크립 처치' : 'Kill Creep', points: '840-2000pt' },
      ],
    },
    {
      name: isKorean ? '영웅 이니셔티브' : 'Hero Initiative',
      icon: Users,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      activities: [
        { action: isKorean ? '프라임 모집' : 'Prime Recruit', points: '400pt' },
        { action: isKorean ? 'EXP 2000당' : 'Mỗi 2000 EXP', points: '1pt' },
      ],
    },
    {
      name: isKorean ? '병력 확장' : 'Army Expansion',
      icon: Swords,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      activities: [
        { action: isKorean ? 'Lv.6 유닛 훈련' : 'Train Lv.6 Unit', points: '150pt' },
        { action: isKorean ? '훈련 가속 1분당' : '1 phút tăng tốc HL', points: '10pt' },
      ],
    },
  ];

  const tips = [
    isKorean
      ? '4시간 창이 끝나기 전에 수동으로 상자를 수령하세요!'
      : 'Thu thủ công hộp trước khi kết thúc 4 tiếng!',
    isKorean
      ? '비슷한 쉘터 레벨의 플레이어와 경쟁 - 순위는 상대적'
      : 'Cạnh tranh với người chơi cùng level shelter - xếp hạng tương đối',
    isKorean
      ? '연맹 대결과 겹칠 때 활동하면 보상 2배 효과 (골든 아워)'
      : 'Hoạt động khi trùng AD = thưởng gấp đôi (Golden Hour)',
    isKorean
      ? '테마 변경 직후 큰 비용의 건설/훈련을 시작하지 마세요'
      : 'KHÔNG bắt đầu xây/huấn luyện tốn kém ngay sau khi đổi theme',
    isKorean
      ? '차량 개조 테마에서 크립 처치가 최고 효율'
      : 'Theme Mod Vehicle: kill creep hiệu quả nhất',
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-basic">
              {t('difficulty.basic')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              5 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Timer className="h-8 w-8 text-highlight" />
            {isKorean ? '전면전비 (Full Preparedness) 가이드' : 'Hướng dẫn Full Preparedness'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '매일 4시간마다 테마가 변경되는 일일 이벤트입니다. 테마에 맞는 활동만 포인트를 획득할 수 있습니다.'
              : 'Sự kiện hàng ngày đổi theme mỗi 4 tiếng. Chỉ hoạt động đúng theme mới được điểm.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '5개 테마가 4시간마다 순환' : '5 theme xoay vòng mỗi 4 tiếng'}</li>
              <li>• {isKorean ? '현재 테마에 해당하는 활동만 포인트 획득 가능' : 'Chỉ hoạt động đúng theme hiện tại mới được điểm'}</li>
              <li>• {isKorean ? '4시간 창 끝나기 전 수동으로 상자 수령 필수!' : 'Thu thủ công hộp trước khi hết 4 tiếng!'}</li>
              <li>• {isKorean ? '연맹 대결과 겹칠 때 = 보상 2배' : 'Khi trùng AD = thưởng gấp đôi'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Important Rule */}
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-destructive mb-1">
                  {isKorean ? '핵심 규칙' : 'Quy tắc cốt lõi'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '4시간 창이 끝나기 전에 수동으로 상자를 수령하세요! 자동 수령되지 않으며, 시간이 지나면 보상을 잃습니다. 테마 변경 직후에는 비용이 큰 건설/훈련을 시작하지 마세요.'
                    : 'Thu thủ công hộp trước khi kết thúc 4 tiếng! Không tự động nhận, hết giờ sẽ mất thưởng. KHÔNG bắt đầu xây/huấn luyện tốn kém ngay sau khi đổi theme.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5 Themes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '5개 테마 (4시간마다 순환)' : '5 Theme (Xoay vòng mỗi 4 tiếng)'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme) => {
              const Icon = theme.icon;
              return (
                <Card key={theme.name} className={`${theme.bg} border-none`}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className={`h-5 w-5 ${theme.color}`} />
                      <span className={`font-semibold ${theme.color}`}>{theme.name}</span>
                    </div>
                    <div className="space-y-2">
                      {theme.activities.map((activity, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{activity.action}</span>
                          <span className="font-mono text-highlight">{activity.points}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Golden Hour */}
        <Card className="border-highlight/30 bg-highlight/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Gift className="h-6 w-6 text-highlight shrink-0" />
              <div>
                <p className="font-semibold text-highlight mb-1">
                  {isKorean ? '골든 아워 (연맹 대결 + 전면전비)' : 'Golden Hour (AD + Full Prep)'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '연맹 대결과 전면전비의 테마가 겹칠 때 활동하면 두 이벤트에서 동시에 포인트를 획득합니다. 가속 아이템 사용의 최적 타이밍입니다.'
                    : 'Khi theme AD và Full Prep trùng nhau, hoạt động sẽ được điểm cả hai sự kiện. Đây là thời điểm tốt nhất để dùng tăng tốc.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Competition Info */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '경쟁 방식' : 'Cách cạnh tranh'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  {isKorean
                    ? '비슷한 쉘터 레벨의 플레이어들과 경쟁합니다. 순위는 상대적이므로 비슷한 수준의 플레이어 중에서 더 열심히 하면 높은 순위를 얻을 수 있습니다.'
                    : 'Cạnh tranh với người chơi cùng level shelter. Xếp hạng tương đối nên cố gắng hơn trong nhóm sẽ được xếp hạng cao hơn.'}
                </p>
                <div className="grid gap-2 sm:grid-cols-3 pt-2">
                  <div className="text-center p-3 rounded-lg bg-yellow-500/10">
                    <p className="text-yellow-400 font-bold">1st</p>
                    <p className="text-xs">{isKorean ? '최고 보상' : 'Thưởng cao nhất'}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gray-500/10">
                    <p className="text-gray-400 font-bold">2nd-3rd</p>
                    <p className="text-xs">{isKorean ? '우수 보상' : 'Thưởng khá'}</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-orange-500/10">
                    <p className="text-orange-400 font-bold">Top 10</p>
                    <p className="text-xs">{isKorean ? '기본 보상' : 'Thưởng cơ bản'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{isKorean ? '팁' : 'Mẹo'}</h2>
          <div className="grid gap-3">
            {tips.map((tip, idx) => (
              <div key={idx} className="info-tip flex gap-3">
                <Lightbulb className="h-5 w-5 text-tip shrink-0" />
                <p className="text-sm text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
