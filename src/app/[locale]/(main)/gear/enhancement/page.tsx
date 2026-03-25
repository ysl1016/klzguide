import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Shield, Swords, AlertTriangle, Lightbulb, Star, Zap } from 'lucide-react';

export default async function GearEnhancementPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <GearEnhancementContent locale={locale} />;
}

function GearEnhancementContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  const gearTiers = [
    {
      name: l('주황 (전설)', 'Cam (Legendary)', 'Orange (Legendary)'),
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      maxLevel: 'Lv.50 → 75 (5헥사곤) → 100 (미식)',
      canPromote: true,
      note: l('유일하게 승급 가능', 'Duy nhất có thể thăng cấp', 'Only tier that can be promoted'),
    },
    {
      name: l('보라 (에픽)', 'Tím (Epic)', 'Purple (Epic)'),
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      maxLevel: 'Lv.30',
      canPromote: false,
      note: l('승급 불가', 'Không thể thăng cấp', 'Cannot be promoted'),
    },
    {
      name: l('블루 (레어)', 'Xanh (Rare)', 'Blue (Rare)'),
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      maxLevel: 'Lv.20',
      canPromote: false,
      note: l('승급 불가', 'Không thể thăng cấp', 'Cannot be promoted'),
    },
    {
      name: l('그린 (일반)', 'Xanh lá (Common)', 'Green (Common)'),
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      maxLevel: '-',
      canPromote: false,
      note: l('업그레이드 불가', 'Không thể nâng cấp', 'Cannot be upgraded'),
    },
  ];

  const hexagonCosts = [
    { hexagon: 1, cores: '100', zent: '1M', note: l('최고 효율!', 'Hiệu quả nhất!', 'Best efficiency!') },
    { hexagon: 2, cores: '400', zent: '2M', note: '' },
    { hexagon: 3, cores: '1,600', zent: '5M', note: '' },
    { hexagon: 4, cores: '6,400', zent: '15M', note: l('F2P 여기까지', 'F2P dừng ở đây', 'F2P stop here') },
    { hexagon: 5, cores: '12,800', zent: '45M', note: l('효율 낮음', 'Hiệu quả thấp', 'Low efficiency') },
  ];

  const gearTypes = [
    {
      name: l('총 (Gun)', 'Súng (Gun)', 'Gun'),
      icon: Swords,
      stats: l('영웅 공격력, 데미지', 'ATK anh hùng, Damage', 'Hero ATK, Damage'),
      priority: l('DPS 1순위', 'Ưu tiên #1 DPS', 'DPS Priority #1'),
      color: 'text-red-400',
    },
    {
      name: l('헬멧 (Helmet)', 'Mũ (Helmet)', 'Helmet'),
      icon: Shield,
      stats: l('공격력, 방어력, 데미지', 'ATK, DEF, Damage', 'ATK, DEF, Damage'),
      priority: l('DPS 2순위', 'Ưu tiên #2 DPS', 'DPS Priority #2'),
      color: 'text-yellow-400',
    },
    {
      name: l('중장갑 (Armor)', 'Giáp (Armor)', 'Armor'),
      icon: Shield,
      stats: l('영웅 방어력, 병력 HP', 'DEF anh hùng, HP quân', 'Hero DEF, Troop HP'),
      priority: l('탱커 1순위', 'Ưu tiên #1 Tank', 'Tank Priority #1'),
      color: 'text-blue-400',
    },
    {
      name: l('부츠 (Boots)', 'Giày (Boots)', 'Boots'),
      icon: Zap,
      stats: l('공격력, 방어력, 병력 HP', 'ATK, DEF, HP quân', 'ATK, DEF, Troop HP'),
      priority: l('탱커 2순위', 'Ưu tiên #2 Tank', 'Tank Priority #2'),
      color: 'text-green-400',
    },
  ];

  const upgradeSteps = [
    l('모든 주황 장비 Lv.20까지 강화 (승급 해금)', 'Nâng tất cả trang bị cam lên Lv.20 (mở thăng cấp)', 'Enhance all orange gear to Lv.20 (unlocks promotion)'),
    l('모든 장비 1성(1헥사곤)으로 승급 (100코어, 최고 효율)', 'Thăng cấp tất cả lên 1 sao (100 core, hiệu quả nhất)', 'Promote all gear to 1-star (100 cores, best efficiency)'),
    l('모든 장비 2성 → 3성 → 4성 순서로 진행', 'Tiến hành 2 sao → 3 sao → 4 sao cho tất cả', 'Progress all gear through 2-star → 3-star → 4-star'),
    l('F2P는 4헥사곤에서 멈춤 (5헥사곤 효율 낮음)', 'F2P dừng ở 4 hexagon (5 hexagon hiệu quả thấp)', 'F2P should stop at 4 hexagons (5th hexagon has low efficiency)'),
  ];

  const mistakes = [
    {
      wrong: l('보라/블루/그린 장비에 합금/코어 사용', 'Dùng alloy/core cho trang bị tím/xanh', 'Using alloy/cores on purple/blue/green gear'),
      right: l('주황 장비에만 투자', 'Chỉ đầu tư vào trang bị cam', 'Only invest in orange gear'),
    },
    {
      wrong: l('한 장비만 집중 업그레이드', 'Chỉ tập trung nâng một trang bị', 'Only upgrading one piece of gear'),
      right: l('모든 장비 고르게 업그레이드', 'Nâng đều tất cả trang bị', 'Upgrade all gear evenly'),
    },
    {
      wrong: l('F2P가 5헥사곤/미식 추구', 'F2P theo đuổi 5 hexagon/mythic', 'F2P chasing 5 hexagon/mythic'),
      right: l('4헥사곤에서 멈추고 다른 영웅 투자', 'Dừng ở 4 hexagon, đầu tư anh hùng khác', 'Stop at 4 hexagons and invest in other heroes'),
    },
  ];

  const totalCosts = {
    perPiece: { cores: '25,400', zent: '68M', items: '10' },
    per5Heroes: { cores: '508,000', zent: '1.36B', items: '200' },
  };

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-intermediate">
              {t('difficulty.intermediate')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              15 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Shield className="h-8 w-8 text-highlight" />
            {l('장비 강화 가이드', 'Hướng dẫn nâng cấp trang bị', 'Gear Enhancement Guide')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '장비 등급, 강화 방법, 에너지코어 사용법을 알아봅니다.',
              'Tìm hiểu cấp trang bị, cách nâng cấp, cách dùng Power Core.',
              'Learn about gear tiers, enhancement methods, and Power Core usage.'
            )}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{l('핵심 요약', 'Tóm tắt', 'Key Summary')}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {l('주황 장비에만 투자 (보라/블루/그린 X)', 'Chỉ đầu tư trang bị cam (tím/xanh X)', 'Only invest in orange gear (not purple/blue/green)')}</li>
              <li>• {l('1헥사곤이 최고 효율 (100코어로 대폭 상승)', '1 hexagon hiệu quả nhất (100 core tăng lớn)', '1st hexagon is most efficient (100 cores for a massive boost)')}</li>
              <li>• {l('F2P는 4헥사곤에서 멈춤', 'F2P dừng ở 4 hexagon', 'F2P should stop at 4 hexagons')}</li>
              <li>• {l('한 장비 집중 X → 모든 장비 고르게 업그레이드', 'Không tập trung 1 → nâng đều tất cả', 'Do not focus on one piece → upgrade all gear evenly')}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Gear Tiers */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('장비 등급', 'Cấp trang bị', 'Gear Tiers')}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {gearTiers.map((tier) => (
              <Card key={tier.name} className={tier.bg}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold ${tier.color}`}>{tier.name}</span>
                    <Badge variant="outline" className={tier.canPromote ? 'text-green-400' : 'text-muted-foreground'}>
                      {tier.maxLevel}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{tier.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Critical Rule */}
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-destructive mb-1">
                  {l('핵심 규칙', 'Quy tắc cốt lõi', 'Core Rule')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {l(
                    '강화 합금(Enhancement Alloy)과 에너지코어는 절대 보라/블루/그린 장비에 사용하지 마세요!',
                    'KHÔNG BAO GIỜ dùng Enhancement Alloy và Power Core cho trang bị tím/xanh/xanh lá!',
                    'NEVER use Enhancement Alloy and Power Cores on purple/blue/green gear!'
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hexagon Costs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('헥사곤(성급) 비용', 'Chi phí Hexagon (sao)', 'Hexagon (Star) Costs')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left p-3">{l('헥사곤', 'Hexagon', 'Hexagon')}</th>
                  <th className="text-right p-3">{l('에너지코어', 'Power Cores', 'Power Cores')}</th>
                  <th className="text-right p-3">Zent</th>
                  <th className="text-left p-3">{l('비고', 'Ghi chú', 'Note')}</th>
                </tr>
              </thead>
              <tbody>
                {hexagonCosts.map((cost) => (
                  <tr key={cost.hexagon} className={`border-b border-border/50 ${cost.hexagon === 1 ? 'bg-green-500/10' : cost.hexagon === 5 ? 'bg-red-500/10' : ''}`}>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        {[...Array(cost.hexagon)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </td>
                    <td className="p-3 text-right font-mono">{cost.cores}</td>
                    <td className="p-3 text-right font-mono">{cost.zent}</td>
                    <td className="p-3 text-muted-foreground">
                      {cost.hexagon === 1 && <span className="text-green-400">{cost.note}</span>}
                      {cost.hexagon === 4 && <span className="text-yellow-400">{cost.note}</span>}
                      {cost.hexagon === 5 && <span className="text-red-400">{cost.note}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground">
            {l(
              '※ 5헥사곤 하나가 전체 비용의 50%를 차지합니다 (12,800코어)',
              '※ 1 hexagon 5 chiếm 50% tổng chi phí (12,800 core)',
              '※ A single 5th hexagon accounts for 50% of total cost (12,800 cores)'
            )}
          </p>
        </section>

        {/* Gear Types */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('장비 종류별 우선순위', 'Ưu tiên theo loại trang bị', 'Gear Type Priority')}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {gearTypes.map((gear) => {
              const Icon = gear.icon;
              return (
                <Card key={gear.name}>
                  <CardContent className="p-4 flex gap-3">
                    <Icon className={`h-6 w-6 ${gear.color} shrink-0`} />
                    <div>
                      <p className={`font-semibold ${gear.color}`}>{gear.name}</p>
                      <p className="text-sm text-muted-foreground">{gear.stats}</p>
                      <Badge variant="outline" className="mt-2 text-xs">{gear.priority}</Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Upgrade Steps */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('업그레이드 순서', 'Thứ tự nâng cấp', 'Upgrade Order')}
          </h2>
          <Card>
            <CardContent className="p-4">
              <ol className="space-y-3">
                {upgradeSteps.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight text-xs font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Total Costs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('총 비용 (5헥사곤 기준)', 'Tổng chi phí (5 hexagon)', 'Total Cost (5 Hexagons)')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{l('장비 1개당', 'Mỗi trang bị', 'Per Piece')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{l('에너지코어', 'Power Cores', 'Power Cores')}</span>
                  <span className="font-mono">{totalCosts.perPiece.cores}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Zent</span>
                  <span className="font-mono">{totalCosts.perPiece.zent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{l('주황 아이템', 'Item cam', 'Orange Items')}</span>
                  <span className="font-mono">{totalCosts.perPiece.items}</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-highlight/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-highlight">{l('5영웅 (20개)', '5 anh hùng (20 cái)', '5 Heroes (20 pieces)')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{l('에너지코어', 'Power Cores', 'Power Cores')}</span>
                  <span className="font-mono text-highlight">{totalCosts.per5Heroes.cores}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Zent</span>
                  <span className="font-mono text-highlight">{totalCosts.per5Heroes.zent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{l('주황 아이템', 'Item cam', 'Orange Items')}</span>
                  <span className="font-mono text-highlight">{totalCosts.per5Heroes.items}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('흔한 실수', 'Sai lầm thường gặp', 'Common Mistakes')}
          </h2>
          <div className="space-y-3">
            {mistakes.map((mistake, idx) => (
              <Card key={idx} className="border-destructive/30">
                <CardContent className="p-4 grid gap-3 sm:grid-cols-2">
                  <div className="flex gap-2">
                    <span className="text-destructive">&#10007;</span>
                    <span className="text-sm text-muted-foreground">{mistake.wrong}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-green-400">&#10003;</span>
                    <span className="text-sm text-muted-foreground">{mistake.right}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{l('팁', 'Mẹo', 'Tips')}</h2>
          <div className="grid gap-3">
            <div className="info-tip flex gap-3">
              <Lightbulb className="h-5 w-5 text-tip shrink-0" />
              <p className="text-sm text-muted-foreground">
                {l(
                  '공훈상점에서 매주 주황 장비 구매 가능 - 놓치지 마세요!',
                  'Có thể mua trang bị cam hàng tuần từ Merit Shop - đừng bỏ lỡ!',
                  'You can buy orange gear weekly from the Merit Shop - do not miss it!'
                )}
              </p>
            </div>
            <div className="info-tip flex gap-3">
              <Lightbulb className="h-5 w-5 text-tip shrink-0" />
              <p className="text-sm text-muted-foreground">
                {l(
                  '용사훈장으로 공훈상점에서 주황 장비 교환 가능 (SVS 보상)',
                  'Đổi trang bị cam ở Black Market bằng Valor Medals (phần thưởng SVS)',
                  'Exchange orange gear at the Black Market using Valor Medals (SVS rewards)'
                )}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
