import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Diamond, Calendar, Trophy, Target, Gift, Lightbulb, AlertTriangle, Shield, Package } from 'lucide-react';

export default async function FreeDiamondsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FreeDiamondsContent locale={locale} />;
}

function FreeDiamondsContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const diamondSources = [
    {
      name: isKorean ? '아레나 순위 보상' : 'Arena Rank Rewards',
      icon: Trophy,
      diamonds: '1,000-5,000',
      frequency: isKorean ? '매주' : 'Hàng tuần',
      tip: isKorean ? '골드 티어 이상 유지 — 가장 안정적인 대량 공급원' : 'Duy trì Gold tier+ — nguồn lớn ổn định nhất',
    },
    {
      name: isKorean ? '난폭 두목 업적' : 'Furylord Achievements',
      icon: Target,
      diamonds: isKorean ? '다양' : 'Đa dạng',
      frequency: isKorean ? '매일 4회' : '4 lần/ngày',
      tip: isKorean ? '매일 4회 공격 필수 — 연료는 자동 회복' : '4 lần tấn công/ngày — nhiên liệu tự phục hồi',
    },
    {
      name: isKorean ? '현상금 상자 (벌크 오픈)' : 'Bounty Mission Chests (Bulk)',
      icon: Package,
      diamonds: '100-5,000',
      frequency: isKorean ? '모아서 한번에' : 'Tích rồi mở 1 lần',
      tip: isKorean ? '10,000개 모아 벌크 오픈 시 20,000+ 다이아 가능' : 'Tích 10,000 hộp mở một lần = 20,000+ diamond',
    },
    {
      name: isKorean ? '일일/주간 임무' : 'Daily/Weekly Tasks',
      icon: Calendar,
      diamonds: '50-500',
      frequency: isKorean ? '매일/매주' : 'Hàng ngày/tuần',
      tip: isKorean ? '150 포인트 달성하여 모든 보상 해금' : 'Đạt 150 điểm để mở tất cả thưởng',
    },
    {
      name: isKorean ? '연맹 대결' : 'Alliance Duel',
      icon: Trophy,
      diamonds: '100-500',
      frequency: isKorean ? '매주 6일' : '6 ngày/tuần',
      tip: isKorean ? '활성 연맹 필수 — 상자 9개 해금 목표' : 'Cần LM hoạt động — mục tiêu 9 hộp',
    },
    {
      name: 'SVS',
      icon: Trophy,
      diamonds: '500-2,000',
      frequency: isKorean ? '정기' : 'Định kỳ',
      tip: isKorean ? '개인 박스 1-3 + 순위 보상' : 'Hộp cá nhân 1-3 + xếp hạng',
    },
    {
      name: isKorean ? '월드맵 다이아 노드' : 'World Map Diamond Nodes',
      icon: Diamond,
      diamonds: isKorean ? '다양' : 'Đa dạng',
      frequency: isKorean ? '매일 확인' : 'Kiểm tra hàng ngày',
      tip: isKorean ? '정기적으로 맵을 확인하여 채집' : 'Kiểm tra bản đồ thường xuyên',
    },
    {
      name: isKorean ? '리딤 코드' : 'Redeem Code',
      icon: Gift,
      diamonds: isKorean ? '다양' : 'Đa dạng',
      frequency: isKorean ? '비정기' : 'Không định kỳ',
      tip: isKorean ? '공식 SNS, 디스코드 정기 확인' : 'Kiểm tra SNS, Discord chính thức',
    },
  ];

  const spendingPriority = [
    {
      item: isKorean ? '주간 방패 (금요일까지 2,000 다이아)' : 'Weekly Shield (2,000 by Friday)',
      priority: 1,
      reason: isKorean ? '토요일 Enemy Buster 대비 — 방패는 어떤 구매보다 가치 있음' : 'Chuẩn bị Enemy Buster thứ 7 — khiên giá trị hơn mọi mua sắm',
    },
    {
      item: isKorean ? 'Key Licenses (전략, 개조, 연구)' : 'Key Licenses (Strategy, Mod, Research)',
      priority: 2,
      reason: isKorean ? '1회 구매, 영구 혜택 — 게임 초반 최우선' : 'Mua 1 lần, lợi ích vĩnh viễn — ưu tiên đầu game',
    },
    {
      item: isKorean ? '피난민 모집권' : 'Refugee Tickets',
      priority: 3,
      reason: isKorean ? '집사(건설속도), 과학자(연구속도) 우선 — 영구 계정 보너스' : 'Butler(xây), Scientist(NC) — bonus vĩnh viễn',
    },
    {
      item: isKorean ? '행운 할인 (40%+ 할인 시만)' : 'Lucky Discounter (40%+ only)',
      priority: 4,
      reason: isKorean ? '경찰휘장 + 가속 — 특권상점 대비 5배 효율' : 'Badge + speed-up — gấp 5 lần VIP Shop',
    },
    {
      item: isKorean ? '할인 가속만 구매 (정가 금지)' : 'Discounted Speedups Only',
      priority: 5,
      reason: isKorean ? '직접 가속 버튼 사용 금지 — 연맹 대결 테마에 맞춰 사용' : 'KHÔNG dùng nút speed-up trực tiếp — dùng theo theme AD',
    },
  ];

  const tips = [
    isKorean
      ? '난폭 두목 매일 4회 공격 필수 — 연료 자동 회복, 업적 다이아 축적'
      : 'Tấn công Furylord 4 lần/ngày — nhiên liệu tự hồi, tích diamond thành tựu',
    isKorean
      ? '현상금 상자를 모아뒀다가 한번에 벌크 오픈 — 10,000개 오픈 시 20,000+ 다이아 가능'
      : 'Tích hộp bounty rồi mở bulk — 10,000 hộp = 20,000+ diamond',
    isKorean
      ? '아레나 무료 새로고침 활용하여 약한 상대만 공격 — Top 50 유지 시 범용 영웅 조각 보너스'
      : 'Dùng free refresh arena đánh đối thủ yếu — Top 50 = bonus mảnh anh hùng',
    isKorean
      ? '이벤트 구매는 반드시 활성 이벤트와 동기화 — 같은 자원으로 2배 보상'
      : 'Mua sắm phải sync với event đang hoạt động — cùng tài nguyên, thưởng gấp đôi',
    isKorean
      ? '직접 가속 버튼은 절대 사용 금지 — 게임 내 최악의 거래'
      : 'KHÔNG BAO GIỜ dùng nút speed-up trực tiếp — giao dịch tệ nhất game',
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
              8 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Diamond className="h-8 w-8 text-highlight" />
            {isKorean ? '무과금 다이아 가이드' : 'Hướng dẫn Diamond F2P'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '무료 다이아 획득처와 효율적인 사용법을 알아봅니다.'
              : 'Tìm hiểu nguồn diamond miễn phí và cách dùng hiệu quả.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '금요일까지 최소 2,000 다이아 유지 (토요일 방패용) — 방패는 어떤 구매보다 가치 있음' : 'Giữ tối thiểu 2,000 diamond đến thứ 6 (khiên thứ 7) — khiên giá trị hơn mọi mua sắm'}</li>
              <li>• {isKorean ? '아레나 골드 티어 이상 = 주간 1,000~5,000 다이아 안정 수입' : 'Arena Gold tier+ = 1,000-5,000 diamond/tuần ổn định'}</li>
              <li>• {isKorean ? '현상금 상자 모아서 벌크 오픈 = 대량 다이아 획득' : 'Tích hộp bounty rồi mở bulk = diamond lớn'}</li>
              <li>• {isKorean ? '꾸준한 주간 수집 > 일회성 잭팟' : 'Thu thập đều hàng tuần > jackpot một lần'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Shield Reserve Warning */}
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Shield className="h-6 w-6 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-destructive mb-1">
                  {isKorean ? '금요일까지 2,000 다이아 필수 비축' : 'Bắt buộc giữ 2,000 diamond đến thứ 6'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '토요일 Enemy Buster(적 파괴자) 이벤트에서 방패가 필요합니다. 방패 없이 공격당하면 병력을 대량 손실합니다. 방패는 게임 내 어떤 구매보다 가치 있습니다.'
                    : 'Cần khiên cho sự kiện Enemy Buster thứ 7. Bị tấn công không có khiên = mất quân lớn. Khiên giá trị hơn mọi mua sắm trong game.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Chest Strategy */}
        <Card className="border-highlight/30 bg-highlight/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Package className="h-6 w-6 text-highlight shrink-0" />
              <div>
                <p className="font-semibold text-highlight mb-1">
                  {isKorean ? '현상금 상자 벌크 오픈 전략' : 'Chiến lược mở bulk hộp Bounty'}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  {isKorean
                    ? '현상금 임무 상자를 바로 열지 말고 모아두세요. 10,000개 이상 모아서 한번에 벌크 오픈하면 20,000+ 다이아를 획득할 수 있습니다.'
                    : 'Đừng mở hộp bounty ngay. Tích 10,000+ hộp rồi mở một lần = 20,000+ diamond.'}
                </p>
                <div className="grid gap-2 sm:grid-cols-3 text-center text-xs">
                  <div className="p-2 rounded-lg bg-secondary/30">
                    <p className="text-muted-foreground">{isKorean ? '상자당 내용물' : 'Mỗi hộp'}</p>
                    <p className="font-mono text-foreground/80">{isKorean ? '~90% 자원 + 다이아' : '~90% tài nguyên + diamond'}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary/30">
                    <p className="text-muted-foreground">{isKorean ? '다이아 범위' : 'Diamond range'}</p>
                    <p className="font-mono text-highlight">100 ~ 5,000</p>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary/30">
                    <p className="text-muted-foreground">{isKorean ? '잭팟 (극히 희귀)' : 'Jackpot (rất hiếm)'}</p>
                    <p className="font-mono text-yellow-400">10,000</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Diamond Sources */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '다이아 획득처' : 'Nguồn Diamond'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {diamondSources.map((source) => {
              const Icon = source.icon;
              return (
                <Card key={source.name}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-5 w-5 text-highlight" />
                      <span className="font-semibold">{source.name}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl font-bold text-highlight">{source.diamonds}</span>
                      <Badge variant="outline" className="text-xs">{source.frequency}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{source.tip}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Spending Priority */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '다이아 사용 우선순위' : 'Ưu tiên dùng Diamond'}
          </h2>
          <div className="space-y-3">
            {spendingPriority.map((item) => (
              <Card key={item.priority} className={item.priority === 1 ? 'border-highlight/50 bg-highlight/5' : ''}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold">
                    {item.priority}
                  </div>
                  <div>
                    <p className="font-semibold">{item.item}</p>
                    <p className="text-sm text-muted-foreground">{item.reason}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
