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
      ? '차량 개조 시스템 완벽 가이드 - 차량 진행, 렌치 비용, 황금렌치 획득법'
      : 'Hướng dẫn hoàn chỉnh hệ thống cải tiến xe - tiến trình xe, chi phi cờ lê, cách nhận cờ lê vàng',
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
      name: isKorean ? '치타 (Cheetah)' : 'Cheetah',
      tier: isKorean ? '초반' : 'Early',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      desc: isKorean ? '기본 차량. 본부(HQ) Lv.5에서 해금' : 'Xe cơ bản. Mở khóa ở HQ Lv.5',
      priority: isKorean ? '레벨 60까지만 투자' : 'Chỉ đầu tư đến level 60',
    },
    {
      name: isKorean ? '헤라클레스 (Hercules)' : 'Hercules',
      tier: isKorean ? '중반' : 'Mid',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      desc: isKorean ? '탱크형 차량. 본부(HQ) Lv.12에서 해금' : 'Xe tank. Mở khóa ở HQ Lv.12',
      priority: isKorean ? '레벨 120까지 주력으로 사용' : 'Dùng chính đến level 120',
    },
    {
      name: isKorean ? '디스트로이어 (Destroyer)' : 'Destroyer',
      tier: isKorean ? '후반' : 'Late',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      desc: isKorean ? '공격형 차량. 본부(HQ) Lv.20에서 해금' : 'Xe tấn công. Mở khóa ở HQ Lv.20',
      priority: isKorean ? '레벨 180 이상 투자 권장' : 'Khuyến nghị đầu tư 180+',
    },
    {
      name: isKorean ? '디스트로이어 EX' : 'Destroyer EX',
      tier: isKorean ? '최종' : 'End',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      desc: isKorean ? '최종 차량. 디스트로이어 Lv.240 달성 후 해금' : 'Xe cuối cùng. Mở khóa sau Destroyer Lv.240',
      priority: isKorean ? '장기 목표 - 무과금은 6개월+' : 'Mục tiêu dài hạn - F2P 6 tháng+',
    },
  ];

  const wrenchCosts = [
    { level: '0 -> 30', normal: '450', golden: '0' },
    { level: '30 -> 60', normal: '1,350', golden: '0' },
    { level: '60 -> 90', normal: '2,700', golden: '15' },
    { level: '90 -> 120', normal: '4,500', golden: '45' },
    { level: '120 -> 150', normal: '6,750', golden: '90' },
    { level: '150 -> 180', normal: '9,450', golden: '150' },
    { level: '180 -> 210', normal: '12,600', golden: '225' },
    { level: '210 -> 240', normal: '16,200', golden: '315' },
  ];

  const goldenSources = [
    {
      source: isKorean ? '6일 로테이션 (Day 1)' : '6-day Rotation (Day 1)',
      amount: isKorean ? '매 로테이션 보상' : 'Mỗi vòng xoay',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      desc: isKorean ? '6일 로테이션 첫째 날 보상에서 획득' : 'Nhận từ phần thưởng ngày đầu vòng xoay 6 ngày',
    },
    {
      source: isKorean ? '가챠 고 이벤트' : 'Gacha Go Event',
      amount: isKorean ? '이벤트 보상' : 'Phần thưởng event',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      desc: isKorean ? '가챠 고 마일스톤 보상에서 획득 가능' : 'Nhận từ mốc thưởng Gacha Go',
    },
    {
      source: isKorean ? '특별 이벤트/패키지' : 'Special Events/Packages',
      amount: isKorean ? '비정기' : 'Không cố định',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      desc: isKorean ? '시즌 이벤트, 특별 패키지에서 소량 획득' : 'Nhận ít từ event mùa, gói đặc biệt',
    },
    {
      source: isKorean ? '전면전비 (차량 개조 테마)' : 'Full Prep (Vehicle Mod Theme)',
      amount: isKorean ? '테마 보상' : 'Thưởng theme',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      desc: isKorean ? '차량 개조 테마 순위 보상에서 획득 가능' : 'Nhận từ xếp hạng theme cải tiến xe',
    },
  ];

  const tips = [
    isKorean
      ? '차량 개조는 CP 상승폭이 크므로 매일 렌치를 꾸준히 모으세요'
      : 'Cải tiến xe tăng CP nhiều nên hãy tích cờ lê mỗi ngày',
    isKorean
      ? '황금렌치는 절대 낭비하지 마세요 - 레벨 60 이상부터 필요합니다'
      : 'Đừng lãng phí cờ lê vàng - cần từ level 60 trở lên',
    isKorean
      ? '전문 개조사(Expert Modifier)를 반드시 활용하세요 - 렌치 효율 30% 증가'
      : 'Nhất định phải dùng Expert Modifier - tăng hiệu quả cờ lê 30%',
    isKorean
      ? '치타에 과투자하지 마세요 - 헤라클레스로 빨리 넘어가는 것이 효율적'
      : 'Đừng đầu tư quá vào Cheetah - chuyển sang Hercules nhanh hơn hiệu quả hơn',
    isKorean
      ? '고급 개조 면허(Advanced Mod License)는 황금렌치 소모를 줄여줍니다'
      : 'Advanced Mod License giảm tiêu thụ cờ lê vàng',
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
              ? '차량 개조 시스템의 모든 것 - 차량 선택부터 렌치 관리, 황금렌치 획득법까지 완벽 정리'
              : 'Tất cả về hệ thống cải tiến xe - từ chọn xe đến quản lý cờ lê và cách nhận cờ lê vàng'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tom tat'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '차량 진행: 치타 -> 헤라클레스 -> 디스트로이어 -> 디스트로이어 EX' : 'Tiến trình xe: Cheetah -> Hercules -> Destroyer -> Destroyer EX'}</li>
              <li>• {isKorean ? '전문 개조사 필수 사용 - 렌치 효율 30% 증가' : 'Bắt buộc dùng Expert Modifier - tăng hiệu quả cờ lê 30%'}</li>
              <li>• {isKorean ? '황금렌치는 레벨 60 이상부터 필요 - 미리 모아두세요' : 'Cờ lê vàng cần từ level 60+ - hãy tích trước'}</li>
              <li>• {isKorean ? '6일 로테이션 Day 1이 황금렌치의 주요 공급원' : '6-day Rotation Day 1 là nguồn cờ lê vàng chính'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Vehicle Progression */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ArrowRight className="h-6 w-6 text-highlight" />
            {isKorean ? '차량 진행 단계' : 'Tiến trình Xe'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
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
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                    <Star className={`h-4 w-4 ${vehicle.color}`} />
                    <span className="text-xs text-muted-foreground">{vehicle.priority}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Wrench Cost Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Wrench className="h-6 w-6 text-orange-400" />
            {isKorean ? '레벨 구간별 렌치 비용' : 'Chi phi co le theo cap do'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                        {isKorean ? '레벨 구간' : 'Khoang level'}
                      </th>
                      <th className="text-right py-2 px-3 text-muted-foreground font-medium">
                        {isKorean ? '일반 렌치' : 'Co le thuong'}
                      </th>
                      <th className="text-right py-2 px-3 text-muted-foreground font-medium">
                        {isKorean ? '황금렌치' : 'Co le vang'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {wrenchCosts.map((row, idx) => (
                      <tr key={idx} className="border-b border-border/50">
                        <td className="py-2 px-3 font-mono">{row.level}</td>
                        <td className="py-2 px-3 text-right font-mono text-orange-400">{row.normal}</td>
                        <td className="py-2 px-3 text-right font-mono text-yellow-400">{row.golden}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                {isKorean
                  ? '* 전문 개조사 미사용 기준. 전문 개조사 사용 시 약 30% 절감'
                  : '* Chua tinh Expert Modifier. Dung Expert Modifier giam ~30%'}
              </p>
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
                    ? '차량 개조 시 전문 개조사를 사용하면 렌치 소모가 약 30% 감소합니다. 항상 전문 개조사를 활성화한 상태에서 개조하세요.'
                    : 'Khi cai tien xe, dung Expert Modifier giam ~30% co le. Luon bat Expert Modifier truoc khi cai tien.'}
                </p>
                <div className="grid gap-2 sm:grid-cols-2 mt-3">
                  <div className="p-3 rounded-lg bg-green-500/10 text-center">
                    <p className="text-green-400 font-bold">{isKorean ? '사용 O' : 'Co dung'}</p>
                    <p className="text-xs text-muted-foreground">{isKorean ? '렌치 비용 ~30% 절감' : 'Giam ~30% co le'}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-500/10 text-center">
                    <p className="text-red-400 font-bold">{isKorean ? '사용 X' : 'Khong dung'}</p>
                    <p className="text-xs text-muted-foreground">{isKorean ? '렌치 낭비 - 절대 금지!' : 'Lang phi co le - KHONG!'}</p>
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
                    ? '고급 개조 면허는 황금렌치의 소모량을 줄여줍니다. 장기적으로 큰 절약 효과가 있으므로 가능한 빨리 획득하세요. 높은 레벨 구간에서는 황금렌치가 대량으로 필요하기 때문에 면허의 가치가 더욱 커집니다.'
                    : 'Advanced Mod License giam luong co le vang tieu thu. Tiet kiem lon ve lau dai nen hay lay som nhat co the. O cap do cao can nhieu co le vang nen gia tri cua license cang lon.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Golden Wrench Sources */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <RotateCw className="h-6 w-6 text-yellow-400" />
            {isKorean ? '황금렌치 획득처' : 'Nguon co le vang'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
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
                  {isKorean ? '주의사항' : 'Luu y'}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {isKorean ? '전문 개조사 없이 개조하지 마세요 - 렌치 30% 손해' : 'Khong cai tien ma khong co Expert Modifier - mat 30% co le'}</li>
                  <li>• {isKorean ? '치타에 렌치를 과투자하면 나중에 후회합니다' : 'Dau tu qua vao Cheetah se hoi han sau nay'}</li>
                  <li>• {isKorean ? '황금렌치를 함부로 쓰지 마세요 - 후반 구간에서 대량 필요' : 'Dung lang phi co le vang - can nhieu o cap do cao'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{isKorean ? '팁' : 'Meo'}</h2>
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
