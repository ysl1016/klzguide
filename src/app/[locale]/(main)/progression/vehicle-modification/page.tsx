import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Wrench, Lightbulb, AlertTriangle, Car, Star, ArrowRight, Gem, RotateCw } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'ko' ? '차량 개조 가이드 | KLZ Guide' : 'Hướng dẫn Cải tiến Xe | KLZ Guide',
    description: locale === 'ko'
      ? '차량 개조 시스템 완벽 가이드 - 차량 진행, 골드렌치 비용, 획득법'
      : 'Hướng dẫn hoàn chỉnh hệ thống cải tiến xe - tiến trình xe, chi phí cờ lê vàng, cách nhận',
  };
}

export default async function VehicleModificationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <VehicleModContent locale={locale} />;
}

function VehicleModContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const vehicles = [
    {
      name: isKorean ? '정복자 (Conqueror)' : 'Conqueror',
      tier: isKorean ? '튜토리얼' : 'Tutorial',
      color: 'text-gray-400',
      bg: 'bg-gray-500/10',
      desc: isKorean ? '튜토리얼 차량. 게임 시작 시 무료 해금' : 'Xe hướng dẫn. Mở khóa miễn phí khi bắt đầu',
      priority: isKorean ? '시스템 학습용 - 빠르게 통과' : 'Học hệ thống - qua nhanh',
      unlock: 'Lv.0',
      wrenchCost: '0',
    },
    {
      name: isKorean ? '치타 (Cheetah)' : 'Cheetah',
      tier: isKorean ? '초반' : 'Early',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      desc: isKorean ? '장갑 차량. 개조 레벨 45에서 해금' : 'Xe bọc thép. Mở khóa ở Modification Lv.45',
      priority: isKorean ? '핵심 스킬: 자기폭풍 방패 (Lv.65) - 영웅 방어력 증가' : 'Skill chính: Magnetic Storm Shield (Lv.65) - tăng DEF anh hùng',
      unlock: 'Lv.45',
      wrenchCost: '150',
    },
    {
      name: isKorean ? '타이탄 (Hercules)' : 'Hercules',
      tier: isKorean ? '중반' : 'Mid',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      desc: isKorean ? '탱크형 차량. 개조 레벨 95에서 해금' : 'Xe tank. Mở khóa ở Modification Lv.95',
      priority: isKorean ? '핵심 스킬: 전쟁 광란 (Lv.105) - 영웅 공격력 증가' : 'Skill chính: War Frenzy (Lv.105) - tăng ATK anh hùng',
      unlock: 'Lv.95',
      wrenchCost: '1,670',
    },
    {
      name: isKorean ? '파괴자 (Destroyer)' : 'Destroyer',
      tier: isKorean ? '후반' : 'Late',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      desc: isKorean ? '공격형 차량. 개조 레벨 145에서 해금' : 'Xe tấn công. Mở khóa ở Modification Lv.145',
      priority: isKorean ? '장기 투자 대상 - 높은 골드렌치 요구량' : 'Đầu tư dài hạn - cần nhiều cờ lê vàng',
      unlock: 'Lv.145',
      wrenchCost: '10,380',
    },
    {
      name: isKorean ? '파괴자 EX' : 'Destroyer EX',
      tier: isKorean ? '최종' : 'End',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      desc: isKorean ? '최종 차량. 개조 레벨 195에서 해금' : 'Xe cuối cùng. Mở khóa ở Modification Lv.195',
      priority: isKorean ? '최종 목표 - 무과금은 장기간 소요' : 'Mục tiêu cuối - F2P cần thời gian dài',
      unlock: 'Lv.195',
      wrenchCost: '35,240',
    },
  ];

  const modifierTiers = [
    { tier: isKorean ? '인턴 개조사' : 'Intern Modifier', level: 'Lv.0 ~ 15', cost: isKorean ? '1 골드렌치/레벨' : '1 wrench/level' },
    { tier: isKorean ? '초보 개조사' : 'Novice Modifier', level: 'Lv.20 ~ 35', cost: isKorean ? '2~4 골드렌치/레벨' : '2-4 wrench/level' },
    { tier: isKorean ? '베테랑 개조사' : 'Veteran Modifier', level: 'Lv.45 ~ 65', cost: isKorean ? '8~18 골드렌치/레벨' : '8-18 wrench/level' },
    { tier: isKorean ? '엘리트 개조사' : 'Elite Modifier', level: 'Lv.70 ~ 95', cost: isKorean ? '20~40 골드렌치/레벨' : '20-40 wrench/level' },
    { tier: isKorean ? '전문 개조사' : 'Expert Modifier', level: 'Lv.100 ~ 135', cost: isKorean ? '45~124 골드렌치/레벨' : '45-124 wrench/level' },
    { tier: isKorean ? '마스터 이상' : 'Master+', level: 'Lv.140 ~ 240', cost: isKorean ? '124~480 골드렌치/레벨' : '124-480 wrench/level' },
  ];

  const goldenSources = [
    {
      source: isKorean ? '연맹 발굴 (Alliance Digging)' : 'Alliance Digging',
      amount: isKorean ? '주 30~40개' : '30-40/tuần',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      desc: isKorean ? '연맹 활동으로 꾸준히 획득 — 가장 안정적인 공급원' : 'Nhận đều đặn từ hoạt động liên minh — nguồn ổn định nhất',
    },
    {
      source: isKorean ? '좀비공성 (Zombie Siege)' : 'Zombie Siege',
      amount: isKorean ? '주 ~12개' : '~12/tuần',
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      desc: isKorean ? '주간 좀비공성 완료 보상으로 획득' : 'Nhận từ hoàn thành Zombie Siege hàng tuần',
    },
    {
      source: isKorean ? '특권상점 (VIP Store, Lv.5+)' : 'VIP Store (Lv.5+)',
      amount: isKorean ? '주 10개' : '10/tuần',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      desc: isKorean ? 'VIP 레벨 5 이상에서 매주 구매 가능' : 'Mua hàng tuần từ VIP level 5+',
    },
    {
      source: isKorean ? '영광상점 (Glory Store)' : 'Glory Store',
      amount: isKorean ? '주 5개' : '5/tuần',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      desc: isKorean ? '영광 포인트로 매주 구매 가능' : 'Mua hàng tuần bằng Glory Points',
    },
    {
      source: isKorean ? '가챠 고 이벤트' : 'Gacha Go Event',
      amount: isKorean ? '이벤트 보상 (120개 상자)' : 'Event (hộp 120)',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      desc: isKorean ? '가챠 고 마일스톤 보상에서 획득 — 대량 확보 기회' : 'Nhận từ mốc thưởng Gacha Go — cơ hội lấy nhiều',
    },
    {
      source: isKorean ? '전면전비 (차량 개조 테마)' : 'Full Prep (Vehicle Mod Theme)',
      amount: isKorean ? '테마 보상' : 'Thưởng theme',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      desc: isKorean ? '차량 개조 테마 순위 보상에서 획득 가능' : 'Nhận từ xếp hạng theme cải tiến xe',
    },
  ];

  const tips = [
    isKorean
      ? '차량 개조는 CP 상승폭이 크므로 매일 골드렌치를 꾸준히 모으세요 (월 300개 이상 가능)'
      : 'Cải tiến xe tăng CP nhiều nên hãy tích cờ lê vàng mỗi ngày (300+/tháng)',
    isKorean
      ? '전문 개조사(Expert Modifier)는 타이탄 완료 후 해금 — 경험치 2배 부스트 (30분, 100회 업그레이드). 개조도면 약 150,000장 미리 준비하세요'
      : 'Expert Modifier mở khóa sau Hercules — boost EXP x2 (30 phút, 100 nâng cấp). Chuẩn bị ~150,000 blueprint',
    isKorean
      ? '치타에 과투자하지 마세요 — 타이탄으로 빨리 넘어가는 것이 효율적'
      : 'Đừng đầu tư quá vào Cheetah — chuyển sang Hercules nhanh hơn hiệu quả hơn',
    isKorean
      ? '전면전비 차량 개조 테마 때 좀비/거대좀비 처치로 포인트를 빠르게 쌓으세요'
      : 'Khi theme cải tiến xe Full Prep, kill zombie/giant zombie để tích điểm nhanh',
  ];

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
              12 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Car className="h-8 w-8 text-highlight" />
            {isKorean ? '차량 개조 가이드' : 'Hướng dẫn Cải tiến Xe'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '차량 개조 시스템의 모든 것 — 차량 진행, 골드렌치 비용, 획득법까지 완벽 정리'
              : 'Tất cả về hệ thống cải tiến xe — tiến trình xe, chi phí cờ lê vàng, cách nhận'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '차량 진행: 정복자 → 치타 → 타이탄 → 파괴자 → 파괴자 EX' : 'Tiến trình xe: Conqueror → Cheetah → Hercules → Destroyer → Destroyer EX'}</li>
              <li>• {isKorean ? '총 골드렌치 필요량: Lv.0 → 240 = 약 70,640개' : 'Tổng cờ lê vàng cần: Lv.0 → 240 = ~70,640'}</li>
              <li>• {isKorean ? '전문 개조사(Expert Modifier): 타이탄 완료 후 해금 — 경험치 2배 부스트' : 'Expert Modifier: mở sau Hercules — boost EXP x2'}</li>
              <li>• {isKorean ? '고급 개조 면허: 개조도면 절약 (골드렌치는 절약 안 됨)' : 'Advanced Mod License: tiết kiệm blueprint (KHÔNG giảm cờ lê vàng)'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Vehicle Progression */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ArrowRight className="h-6 w-6 text-highlight" />
            {isKorean ? '차량 진행 단계' : 'Tiến trình Xe'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle, idx) => (
              <Card key={idx} className={`${vehicle.bg} border-none`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-bold text-lg ${vehicle.color}`}>{vehicle.name}</span>
                    <Badge variant="outline" className={`${vehicle.color} border-current/30`}>
                      {vehicle.tier}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{vehicle.desc}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <Star className={`h-4 w-4 ${vehicle.color}`} />
                      <span className="text-xs text-muted-foreground">{vehicle.unlock}</span>
                    </div>
                    <span className="text-xs font-mono text-yellow-400">
                      🔧 {vehicle.wrenchCost}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{vehicle.priority}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Wrench Cost Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Wrench className="h-6 w-6 text-orange-400" />
            {isKorean ? '개조 등급별 골드렌치 비용' : 'Chi phí cờ lê vàng theo cấp'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                        {isKorean ? '개조 등급' : 'Cấp cải tiến'}
                      </th>
                      <th className="text-center py-2 px-3 text-muted-foreground font-medium">
                        {isKorean ? '레벨 범위' : 'Khoảng level'}
                      </th>
                      <th className="text-right py-2 px-3 text-muted-foreground font-medium">
                        {isKorean ? '골드렌치/레벨' : 'Wrench/level'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {modifierTiers.map((row, idx) => (
                      <tr key={idx} className="border-b border-border/50">
                        <td className="py-2 px-3">{row.tier}</td>
                        <td className="py-2 px-3 text-center font-mono text-muted-foreground">{row.level}</td>
                        <td className="py-2 px-3 text-right font-mono text-yellow-400">{row.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-secondary/30 text-xs text-muted-foreground space-y-1">
                <p>{isKorean ? '* 차량 해금 마일스톤 (누적 골드렌치):' : '* Vehicle unlock milestones (cumulative wrenches):'}</p>
                <p className="font-mono">
                  {isKorean
                    ? '치타 Lv.45 = 150개 → 타이탄 Lv.95 = 1,670개 → 파괴자 Lv.145 = 10,380개 → 파괴자 EX Lv.195 = 35,240개 → 최종 Lv.240 = 70,640개'
                    : 'Cheetah Lv.45 = 150 → Hercules Lv.95 = 1,670 → Destroyer Lv.145 = 10,380 → Destroyer EX Lv.195 = 35,240 → Final Lv.240 = 70,640'}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Expert Modifier */}
        <Card className="border-highlight/30 bg-highlight/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Wrench className="h-6 w-6 text-highlight shrink-0" />
              <div>
                <p className="font-semibold text-highlight mb-1">
                  {isKorean ? '전문 개조사 (Expert Modifier)' : 'Expert Modifier'}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  {isKorean
                    ? '타이탄(Hercules) 업그레이드 완료 후 해금되는 시간제한 부스트입니다. 활성화 시 30분간 (최대 100회 업그레이드) 경험치가 2배로 적용됩니다. 사용 전 개조도면(Blueprint)을 약 150,000장 이상 준비하세요. 준비 기준: 현재 업그레이드 비용 × 130.'
                    : 'Boost có thời hạn, mở khóa sau khi hoàn thành Hercules. Kích hoạt: EXP x2 trong 30 phút (tối đa 100 nâng cấp). Chuẩn bị ~150,000 blueprint trước khi dùng. Công thức: chi phí nâng cấp hiện tại × 130.'}
                </p>
                <div className="grid gap-2 sm:grid-cols-3 mt-3">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-center">
                    <p className="text-blue-400 font-bold">{isKorean ? '해금 조건' : 'Điều kiện'}</p>
                    <p className="text-xs text-muted-foreground">{isKorean ? '타이탄 완료' : 'Hoàn thành Hercules'}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/10 text-center">
                    <p className="text-green-400 font-bold">{isKorean ? '효과' : 'Hiệu ứng'}</p>
                    <p className="text-xs text-muted-foreground">{isKorean ? '경험치 2배 (30분)' : 'EXP x2 (30 phút)'}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-500/10 text-center">
                    <p className="text-orange-400 font-bold">{isKorean ? '준비물' : 'Chuẩn bị'}</p>
                    <p className="text-xs text-muted-foreground">{isKorean ? '개조도면 ~150,000장' : '~150,000 blueprint'}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Mod License */}
        <Card className="border-purple-500/30 bg-purple-500/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Gem className="h-6 w-6 text-purple-400 shrink-0" />
              <div>
                <p className="font-semibold text-purple-400 mb-1">
                  {isKorean ? '고급 개조 면허 (Advanced Mod License)' : 'Advanced Mod License'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '개조도면(Blueprint) 소모량을 줄여줍니다. 초반에는 수천 장, 후반에는 수십만 장의 개조도면을 절약할 수 있습니다. 가능한 빨리 획득하세요.'
                    : 'Giảm tiêu thụ blueprint. Tiết kiệm hàng ngàn lúc đầu, hàng trăm ngàn lúc sau. Hãy lấy sớm nhất có thể.'}
                </p>
                <div className="mt-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>
                    {isKorean
                      ? '주의: 개조도면만 절약됩니다. 골드렌치 소모는 줄어들지 않습니다!'
                      : 'Chú ý: Chỉ tiết kiệm blueprint. KHÔNG giảm cờ lê vàng!'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Golden Wrench Sources */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <RotateCw className="h-6 w-6 text-yellow-400" />
            {isKorean ? '골드렌치 획득처 (월 300개 이상)' : 'Nguồn cờ lê vàng (300+/tháng)'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {goldenSources.map((source, idx) => (
              <Card key={idx} className={`${source.bg} border-none`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold ${source.color}`}>{source.source}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{source.desc}</p>
                  <Badge variant="outline" className={`mt-2 ${source.color} border-current/30`}>
                    {source.amount}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Warning */}
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-destructive mb-1">
                  {isKorean ? '주의사항' : 'Lưu ý'}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {isKorean ? '전문 개조사 없이 개조하지 마세요 — 개조도면 150,000장 이상을 준비한 뒤 사용하세요' : 'Đừng cải tiến khi chưa có Expert Modifier — chuẩn bị 150,000+ blueprint'}</li>
                  <li>• {isKorean ? '치타에 골드렌치를 과투자하면 나중에 후회합니다 — 타이탄 해금에 집중' : 'Đầu tư quá vào Cheetah sẽ hối hận — tập trung mở Hercules'}</li>
                  <li>• {isKorean ? '고급 개조 면허는 골드렌치를 절약하지 않습니다 — 개조도면만 절약!' : 'Advanced Mod License KHÔNG tiết kiệm cờ lê vàng — chỉ blueprint!'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

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
