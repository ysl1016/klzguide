import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Building2, Lightbulb, AlertTriangle, ArrowUpCircle, XCircle, FlaskConical, Wheat, Shield, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);
  return {
    title: l('기지 건설 순서 가이드 | KLZ Guide', 'Hướng dẫn Thứ tự Xây dựng Căn cứ | KLZ Guide', 'Base Building Order Guide | KLZ Guide'),
    description: l(
      '기지 건설 순서 완벽 가이드 - 건물 우선순위, 스킵할 건물, HQ 중심 전략',
      'Hướng dẫn hoàn chỉnh thứ tự xây dựng căn cứ - ưu tiên tòa nhà, tòa bỏ qua, chiến lược HQ',
      'Complete base building order guide — building priority, what to skip, and HQ-centric strategy'
    ),
  };
}

export default async function BaseBuildingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BaseBuildingContent locale={locale} />;
}

function BaseBuildingContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  const buildingPriority = [
    {
      rank: 1,
      name: l('본부 (HQ)', 'HQ (Trụ sở)', 'HQ (Headquarters)'),
      reason: l('모든 건물의 레벨 상한을 결정. 항상 최우선 업그레이드', 'Quyết định giới hạn level tất cả tòa nhà. Luôn nâng cấp đầu tiên', 'Determines the level cap for all buildings. Always upgrade first'),
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      icon: Building2,
      detail: l(
        'HQ 레벨이 높아야 다른 건물도 업그레이드할 수 있습니다. 자원이 모이면 무조건 HQ부터 올리세요.',
        'HQ level cao mới nâng cấp được tòa nhà khác. Khi có tài nguyên luôn nâng HQ trước.',
        'Other buildings can only upgrade when HQ level is high enough. Always prioritize HQ when resources are available.'
      ),
    },
    {
      rank: 2,
      name: l('병원', 'Bệnh viện (Hospital)', 'Hospital'),
      reason: l('부상 병력 치료 용량 확보. PvP 손실 최소화의 핵심', 'Đảm bảo dung lượng chữa trị. Chìa khóa giảm thiểu tổn thất PvP', 'Secures healing capacity for wounded troops. Key to minimizing PvP losses'),
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      icon: Shield,
      detail: l(
        '병원 용량이 부족하면 전투에서 부상당한 병력이 사망합니다. 최소 총 병력의 60% 이상을 수용할 수 있어야 합니다.',
        'Thiếu dung lượng bệnh viện thì quân bị thương sẽ chết. Cần chứa được ít nhất 60% tổng quân.',
        'Wounded troops die if hospital capacity is insufficient. Must be able to hold at least 60% of total troops.'
      ),
    },
    {
      rank: 3,
      name: l('훈련소', 'Trại huấn luyện (Training Camp)', 'Training Camp'),
      reason: l('더 높은 레벨의 병력 훈련 해금. 전투력 직결', 'Mở khóa huấn luyện quân cấp cao hơn. Liên quan trực tiếp CP', 'Unlocks higher tier troop training. Directly impacts CP'),
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      icon: Shield,
      detail: l(
        '훈련소 레벨이 높을수록 강한 병력을 훈련할 수 있습니다. HQ 업그레이드 직후 바로 올려야 합니다.',
        'Training Camp level cao hơn huấn luyện được quân mạnh hơn. Nâng ngay sau khi nâng HQ.',
        'Higher Training Camp levels unlock stronger troops. Upgrade immediately after each HQ upgrade.'
      ),
    },
    {
      rank: 4,
      name: l('연구소', 'Phòng nghiên cứu (Research Lab)', 'Research Lab'),
      reason: l('기술 연구 해금 및 가속. 장기 성장의 근본', 'Mở khóa và tăng tốc nghiên cứu. Nền tảng phát triển dài hạn', 'Unlocks and accelerates research. Foundation of long-term growth'),
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      icon: FlaskConical,
      detail: l(
        '연구소는 1개만 있으면 됩니다. 여러 개 건설은 자원 낭비입니다. 레벨업으로 더 높은 기술을 해금하세요.',
        'Chỉ cần 1 phòng NC. Xây nhiều là lãng phí. Nâng level để mở khóa công nghệ cao hơn.',
        'You only need 1 Research Lab. Building more is a waste. Level it up to unlock higher tech.'
      ),
    },
    {
      rank: 5,
      name: l('성벽', 'Tường thành (Walls)', 'Walls'),
      reason: l('방어력 증가. HQ 업그레이드 요구 조건이기도 함', 'Tăng phòng thủ. Cũng là điều kiện nâng HQ', 'Increases defense. Also a prerequisite for HQ upgrades'),
      color: 'text-gray-400',
      bg: 'bg-gray-500/10',
      icon: Shield,
      detail: l(
        '성벽은 HQ 업그레이드의 전제 조건인 경우가 많습니다. 미리미리 올려두세요.',
        'Tường thường là điều kiện tiên quyết nâng HQ. Hãy nâng trước.',
        'Walls are often prerequisites for HQ upgrades. Keep them leveled up in advance.'
      ),
    },
    {
      rank: 6,
      name: l('자원 건물', 'Tòa nhà tài nguyên', 'Resource Buildings'),
      reason: l('패시브 자원 생산. 초반에는 중요하지만 후반에는 비중 감소', 'Sản xuất tài nguyên thụ động. Quan trọng đầu game nhưng giảm dần', 'Passive resource production. Important early game but diminishes later'),
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      icon: Wheat,
      detail: l(
        '자원 건물은 균형 있게 올리되, HQ/병원/훈련소보다 우선하지 마세요.',
        'Nâng tòa tài nguyên cân bằng nhưng đừng ưu tiên hơn HQ/Bệnh viện/Trại HL.',
        'Upgrade resource buildings evenly, but never prioritize them over HQ/Hospital/Training Camp.'
      ),
    },
  ];

  const buildingsToSkip = [
    {
      name: l('장식물/꾸미기 건물', 'Trang trí/Đồ trang trí', 'Decorations/Cosmetic Buildings'),
      reason: l('전투력/성장에 기여하지 않음. 자원 낭비', 'Không đóng góp CP/phát triển. Lãng phí tài nguyên', 'No CP/progression contribution. Waste of resources'),
    },
    {
      name: l('추가 자원 건물 (과도한 수)', 'Thêm tòa tài nguyên (quá nhiều)', 'Extra Resource Buildings (too many)'),
      reason: l('3-4개 이상은 비효율적. 다른 건물에 슬롯을 사용하세요', 'Hơn 3-4 cái không hiệu quả. Dùng slot cho tòa nhà khác', 'More than 3-4 is inefficient. Use building slots for others'),
    },
    {
      name: l('필요 없는 건물 레벨업', 'Nâng level tòa không cần thiết', 'Unnecessary Building Upgrades'),
      reason: l('HQ 요구 조건이 아닌 건물은 나중에 올려도 됩니다', 'Tòa không phải điều kiện HQ thì nâng sau cũng được', 'Buildings that aren\'t HQ prerequisites can be upgraded later'),
    },
  ];

  const hqStrategy = [
    l(
      'HQ는 항상 최우선입니다. 다른 건물이 필요하더라도 HQ 자원은 따로 비축하세요.',
      'HQ luôn là ưu tiên số 1. Dù cần tòa khác, hãy dự trữ tài nguyên cho HQ.',
      'HQ is always top priority. Even if other buildings are needed, reserve resources for HQ.'
    ),
    l(
      'HQ 업그레이드 전에 전제 조건 건물(성벽 등)을 미리 올려두세요.',
      'Nâng các tòa điều kiện (tường, v.v.) trước khi nâng HQ.',
      'Pre-level prerequisite buildings (walls, etc.) before upgrading HQ.'
    ),
    l(
      'HQ 레벨이 오르면 바로 훈련소와 연구소를 업그레이드하세요.',
      'Khi HQ lên level, nâng ngay Trại HL và Phòng NC.',
      'As soon as HQ levels up, upgrade Training Camp and Research Lab immediately.'
    ),
    l(
      '가속 아이템은 HQ 건설에 우선 사용하세요.',
      'Ưu tiên dùng tăng tốc cho xây HQ.',
      'Prioritize using speedups on HQ construction.'
    ),
  ];

  const labTiming = [
    {
      phase: l('초반 (HQ 1-10)', 'Đầu game (HQ 1-10)', 'Early (HQ 1-10)'),
      labs: '1',
      reason: l('연구소 1개면 충분. 다른 건물에 집중', '1 phòng NC đủ. Tập trung tòa khác', '1 Lab is enough. Focus on other buildings'),
      color: 'text-green-400',
    },
    {
      phase: l('중반 (HQ 11-20)', 'Giữa game (HQ 11-20)', 'Mid (HQ 11-20)'),
      labs: '1',
      reason: l('여전히 1개. 레벨업에 집중하여 고급 기술 해금', 'Vẫn 1 cái. Tập trung nâng level mở khóa CN cao', 'Still 1. Focus on leveling to unlock higher tech'),
      color: 'text-blue-400',
    },
    {
      phase: l('후반 (HQ 21+)', 'Cuối game (HQ 21+)', 'Late (HQ 21+)'),
      labs: '1',
      reason: l('연구소는 항상 1개입니다. 여러 개 건설 불가', 'Phòng NC luôn 1 cái. Không xây được nhiều', 'Only 1 Lab is available. Cannot build more'),
      color: 'text-purple-400',
    },
  ];

  const resourceStrategy = [
    l(
      '각 자원 건물을 균등하게 업그레이드하세요 - 특정 자원만 올리면 병목이 생깁니다',
      'Nâng cấp đều các tòa tài nguyên - chỉ nâng một loại sẽ bị tắc nghẽn',
      'Upgrade resource buildings evenly — focusing on one type creates bottlenecks'
    ),
    l(
      '자원 건물보다 파밍(좀비 처치, 자원 타일 채집)이 후반에는 더 효율적입니다',
      'Farming (kill zombie, thu thập tile) hiệu quả hơn tòa tài nguyên ở cuối game',
      'Farming (killing zombies, gathering tiles) is more efficient than resource buildings late game'
    ),
    l(
      '자원이 넘치면 바로 사용하세요 - 약탈당할 수 있습니다',
      'Khi tài nguyên dư hãy dùng ngay - có thể bị cướp',
      'Spend excess resources immediately — they can be plundered'
    ),
    l(
      '자원 보호 창고를 업그레이드하면 약탈 손실을 줄일 수 있습니다',
      'Nâng cấp kho bảo vệ tài nguyên giảm thiệt hại khi bị cướp',
      'Upgrading resource protection storage reduces plunder losses'
    ),
  ];

  const tips = [
    l(
      'HQ 업그레이드는 게임 내 가장 중요한 행동입니다. 자원이 모이면 무조건 HQ!',
      'Nâng HQ là hành động quan trọng nhất trong game. Khi có tài nguyên luôn nâng HQ!',
      'Upgrading HQ is the single most important action in the game. Always HQ first!'
    ),
    l(
      '병원 용량 확보를 소홀히 하면 PvP에서 병력을 잃게 됩니다',
      'Bỏ quên dung lượng bệnh viện sẽ mất quân trong PvP',
      'Neglecting hospital capacity means losing troops permanently in PvP'
    ),
    l(
      '건설 큐를 비워두지 마세요 - 항상 무언가를 건설 중이어야 합니다',
      'Đừng để trống hàng đợi xây - luôn phải xây gì đó',
      'Never leave the construction queue empty — always have something building'
    ),
    l(
      '무료 건설 가속(5분 이하)을 매번 활용하세요',
      'Luôn tận dụng tăng tốc xây miễn phí (dưới 5 phút)',
      'Always use the free construction speedup (under 5 minutes)'
    ),
    l(
      '전면전비 건물 업그레이드 테마 때 가속 아이템을 사용하면 이벤트 포인트도 획득할 수 있습니다',
      'Dùng tăng tốc khi theme xây Full Prep để nhận điểm event',
      'Using speedups during the Full Prep building upgrade theme also earns event points'
    ),
    l(
      'HQ 업그레이드 상세 비용은 HQ 업그레이드 가이드를 참고하세요',
      'Chi phí chi tiết nâng HQ xem ở hướng dẫn Nâng cấp Trụ sở',
      'See the HQ Upgrade Guide for detailed upgrade costs'
    ),
    l(
      '자원 생산 건물(농장, 거주지, 풍력발전)은 스킵하세요 — 채집이 10~50배 더 효율적입니다',
      'Bỏ qua tòa nhà sản xuất tài nguyên (Farmhouse, Residence, Wind Turbine) — thu thập gấp 10-50 lần hiệu quả',
      'Skip resource production buildings (Farmhouse, Residence, Wind Turbine) — gathering is 10-50x more efficient'
    ),
    l(
      '랠리 광장은 레벨 20까지만 투자하세요 — 그 이상은 효율이 없습니다',
      'Rally Square chỉ đầu tư đến level 20 — quá đó không hiệu quả',
      'Only invest in Rally Square up to level 20 — beyond that it\'s not worth it'
    ),
    l(
      '생산센터를 우선 업그레이드하세요 — 채집속도 + 부대 적재량 동시 증가',
      'Ưu tiên nâng Production Center — tăng tốc thu thập + tải quân',
      'Prioritize upgrading Production Center — boosts both gathering speed and troop load'
    ),
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-basic">
              {t('difficulty.beginner')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              10 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building2 className="h-8 w-8 text-highlight" />
            {l('기지 건설 순서 가이드', 'Hướng dẫn Thứ tự Xây dựng Căn cứ', 'Base Building Order Guide')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '효율적인 건설 순서를 따르면 같은 자원으로 더 빠르게 성장할 수 있습니다. HQ 중심의 건설 전략을 알아봅시다.',
              'Theo thứ tự xây dựng hiệu quả sẽ phát triển nhanh hơn với cùng tài nguyên. Tìm hiểu chiến lược xây dựng tập trung HQ.',
              'Following an efficient build order lets you grow faster with the same resources. Learn the HQ-centric building strategy.'
            )}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{l('핵심 요약', 'Tóm tắt', 'TL;DR')}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {l('건설 우선순위: HQ > 병원 > 훈련소 > 연구소 > 성벽 > 자원 건물', 'Ưu tiên: HQ > Bệnh viện > Trại HL > Phòng NC > Tường > Tòa tài nguyên', 'Priority: HQ > Hospital > Training Camp > Research Lab > Walls > Resource Buildings')}</li>
              <li>• {l('HQ는 항상 최우선 - 다른 모든 건물의 레벨 상한을 결정', 'HQ luôn ưu tiên số 1 - quyết định giới hạn level tất cả tòa', 'HQ is always #1 — it determines the level cap for all other buildings')}</li>
              <li>• {l('연구소는 1개면 충분 - 레벨업에 집중', 'Phòng NC 1 cái đủ - tập trung nâng level', '1 Research Lab is enough — focus on leveling it up')}</li>
              <li>• {l('장식/불필요한 건물은 건너뛰기', 'Bỏ qua trang trí/tòa không cần thiết', 'Skip decorations and unnecessary buildings')}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Building Priority */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ArrowUpCircle className="h-6 w-6 text-highlight" />
            {l('건물 우선순위', 'Ưu tiên tòa nhà', 'Building Priority')}
          </h2>
          <div className="space-y-4">
            {buildingPriority.map((building) => {
              const Icon = building.icon;
              return (
                <Card key={building.rank} className={`${building.bg} border-none`}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight font-bold text-lg">
                        {building.rank}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className={`h-5 w-5 ${building.color}`} />
                          <span className={`font-bold text-lg ${building.color}`}>{building.name}</span>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">{building.reason}</p>
                        <p className="text-xs text-muted-foreground">{building.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Buildings to Skip */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <XCircle className="h-6 w-6 text-red-400" />
            {l('건너뛸 건물 / 후순위', 'Tòa nhà bỏ qua / Ưu tiên sau', 'Buildings to Skip / Low Priority')}
          </h2>
          <Card className="border-destructive/50 bg-destructive/10">
            <CardContent className="p-4">
              <div className="space-y-4">
                {buildingsToSkip.map((building, idx) => (
                  <div key={idx} className="flex gap-3">
                    <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-destructive">{building.name}</p>
                      <p className="text-xs text-muted-foreground">{building.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* HQ-Centric Strategy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="h-6 w-6 text-yellow-400" />
            {l('HQ 중심 전략', 'Chiến lược tập trung HQ', 'HQ-Centric Strategy')}
          </h2>
          <Card className="border-highlight/30 bg-highlight/5">
            <CardContent className="p-4">
              <ol className="space-y-3">
                {hqStrategy.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </section>

        {/* Lab Timing */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FlaskConical className="h-6 w-6 text-purple-400" />
            {l('연구소 타이밍', 'Thời điểm Phòng NC', 'Research Lab Timing')}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="grid gap-4 sm:grid-cols-3">
                {labTiming.map((phase, idx) => (
                  <div key={idx} className="text-center p-4 rounded-lg bg-muted/30">
                    <p className={`text-sm font-medium ${phase.color} mb-1`}>{phase.phase}</p>
                    <p className={`text-3xl font-bold ${phase.color}`}>{phase.labs}</p>
                    <p className="text-xs text-muted-foreground mt-1">{l('연구소', 'Phòng NC', 'Lab')}</p>
                    <p className="text-xs text-muted-foreground mt-2">{phase.reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Resource Building Strategy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Wheat className="h-6 w-6 text-green-400" />
            {l('자원 건물 전략', 'Chiến lược tòa tài nguyên', 'Resource Building Strategy')}
          </h2>
          <Card>
            <CardContent className="p-4">
              <ul className="space-y-3">
                {resourceStrategy.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-400 font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Link to HQ Guide */}
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <LinkIcon className="h-6 w-6 text-blue-400 shrink-0" />
              <div>
                <p className="font-semibold text-blue-400 mb-1">
                  {l('HQ 업그레이드 가이드', 'Hướng dẫn Nâng cấp HQ', 'HQ Upgrade Guide')}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  {l(
                    'HQ 레벨별 업그레이드 비용과 해금 콘텐츠를 확인하세요.',
                    'Xem chi phí nâng cấp và nội dung mở khóa theo level HQ.',
                    'Check upgrade costs and unlocked content for each HQ level.'
                  )}
                </p>
                <Link
                  href={`/${locale}/progression/hq`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-400 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors"
                >
                  {l('HQ 가이드 보기', 'Xem hướng dẫn HQ', 'View HQ Guide')}
                  <ArrowUpCircle className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Warning */}
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
              <div>
                <p className="font-semibold text-destructive mb-1">
                  {l('초보자 흔한 실수', 'Sai lầm thường gặp của người mới', 'Common Beginner Mistakes')}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {l('HQ를 뒤로 미루고 다른 건물만 올리기 - 성장 병목의 원인', 'Trì hoãn HQ mà nâng tòa khác - nguyên nhân tắc nghẽn phát triển', 'Delaying HQ to upgrade other buildings — causes progression bottlenecks')}</li>
                  <li>• {l('병원 용량 무시 - PvP에서 병력 영구 손실', 'Bỏ qua dung lượng bệnh viện - mất quân vĩnh viễn trong PvP', 'Ignoring hospital capacity — permanent troop loss in PvP')}</li>
                  <li>• {l('자원 건물에 과투자 - 후반에는 파밍이 더 효율적', 'Đầu tư quá vào tòa tài nguyên - cuối game farming hiệu quả hơn', 'Over-investing in resource buildings — farming is more efficient late game')}</li>
                  <li>• {l('건설 큐를 비워두기 - 시간 낭비', 'Để trống hàng đợi xây - lãng phí thời gian', 'Leaving the construction queue empty — wasted time')}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{l('팁', 'Mẹo', 'Tips')}</h2>
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
