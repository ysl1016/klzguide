import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Swords, Shield, Crosshair, Star, AlertTriangle, Info } from 'lucide-react';

export default async function FactionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <FactionContent locale={locale} />;
}

function FactionContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  const factions = [
    {
      name: l('새벽의 날개', 'Cánh Bình Minh', 'Wings of Dawn'),
      nameEn: 'Wings of Dawn',
      color: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      bgColor: 'bg-blue-500/10',
      icon: Crosshair,
      troopType: l('슈터 (Shooter)', 'Xạ thủ (Shooter)', 'Shooter'),
      style: l('원거리 딜러', 'Dealer tầm xa', 'Ranged DPS'),
      description: l(
        '슈터 중심의 진영. 서버의 약 70%가 블러디 로즈를 선택하기 때문에, 새벽의 날개는 자연스러운 카운터 이점을 가집니다. 전략적으로 가장 추천되는 진영입니다.',
        'Phe tập trung vào Xạ thủ. Khoảng 70% server chọn Blood Rose, nên Cánh Bình Minh có lợi thế counter tự nhiên. Phe được khuyến nghị nhất về mặt chiến thuật.',
        'Shooter-focused faction. Since ~70% of servers pick Blood Rose, Wings of Dawn has a natural counter advantage. Strategically the most recommended faction.'
      ),
      pros: [
        l('블러디 로즈(메타 진영)를 카운터', 'Counter Blood Rose (phe meta)', 'Counters Blood Rose (the meta faction)'),
        l('원거리 DPS로 안정적', 'DPS tầm xa ổn định', 'Stable ranged DPS'),
        l('대부분의 서버에서 유리', 'Có lợi ở hầu hết server', 'Advantageous on most servers'),
      ],
      cons: [
        l('질서의 수호자에게 카운터 당함', 'Bị counter bởi Người Bảo Vệ Trật Tự', 'Countered by Guard of Order'),
        l('로라(Laura)가 유일한 프론트라인', 'Laura là frontline duy nhất', 'Laura is the only frontline option'),
      ],
      recommended: l('모든 플레이어 (가장 추천)', 'Tất cả người chơi (Khuyến nghị nhất)', 'All players (most recommended)'),
      rating: 5,
      counterInfo: l('블러디 로즈를 이김', 'Thắng Blood Rose', 'Beats Blood Rose'),
    },
    {
      name: l('블러디 로즈', 'Blood Rose', 'Blood Rose'),
      nameEn: 'Blood Rose',
      color: 'text-red-400',
      borderColor: 'border-red-500/30',
      bgColor: 'bg-red-500/10',
      icon: Swords,
      troopType: l('돌격 (Assaulter)', 'Lính đột kích (Assaulter)', 'Assaulter'),
      style: l('근접 돌격', 'Đột kích cận chiến', 'Melee Assault'),
      description: l(
        '돌격 중심의 진영. 높은 데미지와 프론트라인 강점. 하지만 서버의 약 70%가 이 진영을 선택해서, PvP에서 새벽의 날개에게 카운터 당하는 경우가 많습니다.',
        'Phe tập trung vào Lính đột kích. Sát thương cao và frontline mạnh. Nhưng ~70% server chọn phe này, nên thường bị counter bởi Cánh Bình Minh trong PvP.',
        'Assaulter-focused faction. High damage and strong frontline. However, ~70% of servers pick this faction, so it often gets countered by Wings of Dawn in PvP.'
      ),
      pros: [
        l('질서의 수호자를 카운터', 'Counter Người Bảo Vệ Trật Tự', 'Counters Guard of Order'),
        l('높은 데미지 출력', 'Sát thương cao', 'High damage output'),
        l('강력한 프론트라인 영웅들', 'Các anh hùng frontline mạnh', 'Strong frontline heroes'),
      ],
      cons: [
        l('새벽의 날개에게 카운터 당함', 'Bị counter bởi Cánh Bình Minh', 'Countered by Wings of Dawn'),
        l('가장 많이 선택되어 카운터 당하기 쉬움', 'Được chọn nhiều nhất nên dễ bị counter', 'Most popular pick, so easy to counter'),
      ],
      recommended: l('근접 전투 선호자', 'Người thích cận chiến', 'Players who prefer melee combat'),
      rating: 3,
      counterInfo: l('질서의 수호자를 이김', 'Thắng Người Bảo Vệ Trật Tự', 'Beats Guard of Order'),
    },
    {
      name: l('질서의 수호자', 'Người Bảo Vệ Trật Tự', 'Guard of Order'),
      nameEn: 'Guard of Order',
      color: 'text-yellow-400',
      borderColor: 'border-yellow-500/30',
      bgColor: 'bg-yellow-500/10',
      icon: Shield,
      troopType: l('라이더 (Rider)', 'Kỵ binh (Rider)', 'Rider'),
      style: l('기동성 + 측면공격', 'Cơ động + Tấn công sườn', 'Mobility + Flanking'),
      description: l(
        '라이더 중심의 진영. 새벽의 날개를 카운터하지만, 서버에서 새벽의 날개 메타가 확산되지 않는 한 선택률이 낮습니다.',
        'Phe tập trung vào Kỵ binh. Counter Cánh Bình Minh, nhưng tỷ lệ chọn thấp trừ khi server có meta Cánh Bình Minh lan rộng.',
        'Rider-focused faction. Counters Wings of Dawn, but has a low pick rate unless the server develops a Wings of Dawn meta.'
      ),
      pros: [
        l('새벽의 날개를 카운터', 'Counter Cánh Bình Minh', 'Counters Wings of Dawn'),
        l('높은 기동성', 'Cơ động cao', 'High mobility'),
        l('할리에나 등 강력한 탱크', 'Tank mạnh như Harleyena', 'Strong tanks like Harleyena'),
      ],
      cons: [
        l('블러디 로즈에게 카운터 당함', 'Bị counter bởi Blood Rose', 'Countered by Blood Rose'),
        l('선택률이 낮아 카운터 상황이 적음', 'Ít được chọn nên ít cơ hội counter', 'Low pick rate means fewer counter matchups'),
      ],
      recommended: l('새벽의 날개 메타 서버에서 추천', 'Khuyến nghị ở server meta Cánh Bình Minh', 'Recommended on Wings of Dawn meta servers'),
      rating: 3,
      counterInfo: l('새벽의 날개를 이김', 'Thắng Cánh Bình Minh', 'Beats Wings of Dawn'),
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
              7 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold">
            {l('진영 선택 가이드', 'Hướng dẫn chọn phe phái', 'Faction Selection Guide')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '각 진영의 특징을 비교하고 자신에게 맞는 진영을 선택하세요.',
              'So sánh đặc điểm của từng phe phái và chọn phe phù hợp với bạn.',
              'Compare each faction\'s strengths and pick the one that suits your playstyle.'
            )}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{l('핵심 요약', 'Tóm tắt', 'Key Summary')}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {l('새벽의 날개(슈터) 추천 - 서버 70%가 블러디 로즈라서 카운터 이점', 'Cánh Bình Minh (Xạ thủ) được khuyến nghị - Counter 70% server chọn Blood Rose', 'Wings of Dawn (Shooter) recommended - counters 70% of servers running Blood Rose')}</li>
              <li>• {l('상성: 새벽의 날개 > 블러디 로즈 > 질서의 수호자 > 새벽의 날개 (가위바위보)', 'Tương khắc: Cánh Bình Minh > Blood Rose > Người Bảo Vệ Trật Tự > Cánh Bình Minh (oẳn tù tì)', 'Counter cycle: Wings of Dawn > Blood Rose > Guard of Order > Wings of Dawn (rock-paper-scissors)')}</li>
              <li>• {l('최적 조합: 새벽의 날개 3명 + 블러디 로즈 2명 (크로스 시너지)', 'Tổ hợp tối ưu: 3 Cánh Bình Minh + 2 Blood Rose (cross synergy)', 'Optimal comp: 3 Wings of Dawn + 2 Blood Rose (cross synergy)')}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Counter System */}
        <Card className="border-highlight/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-highlight" />
              {l('진영 상성 시스템', 'Hệ thống tương khắc phe phái', 'Faction Counter System')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center gap-4 text-sm">
                <span className="text-blue-400 font-semibold">{l('새벽의 날개', 'Cánh Bình Minh', 'Wings of Dawn')}</span>
                <span className="text-muted-foreground">→ {l('이김', 'thắng', 'beats')} →</span>
                <span className="text-red-400 font-semibold">{l('블러디 로즈', 'Blood Rose', 'Blood Rose')}</span>
                <span className="text-muted-foreground">→ {l('이김', 'thắng', 'beats')} →</span>
                <span className="text-yellow-400 font-semibold">{l('질서의 수호자', 'Người Bảo Vệ Trật Tự', 'Guard of Order')}</span>
                <span className="text-muted-foreground">→ {l('이김', 'thắng', 'beats')} →</span>
                <span className="text-blue-400 font-semibold">{l('새벽의...', 'Cánh...', 'Wings...')}</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {l(
                  '슈터 > 돌격 > 라이더 > 슈터 (가위바위보 구조)',
                  'Xạ thủ > Đột kích > Kỵ binh > Xạ thủ (cấu trúc oẳn tù tì)',
                  'Shooter > Assaulter > Rider > Shooter (rock-paper-scissors)'
                )}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Faction Cards */}
        <div className="space-y-6">
          {factions.map((faction) => {
            const Icon = faction.icon;
            return (
              <Card key={faction.nameEn} className={`border ${faction.borderColor}`}>
                <CardHeader className={`${faction.bgColor} rounded-t-sm`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-background ${faction.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className={faction.color}>{faction.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{faction.style}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < faction.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <p className="text-muted-foreground">{faction.description}</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="font-semibold text-tip mb-2">
                        {l('장점', 'Ưu điểm', 'Pros')}
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {faction.pros.map((pro, idx) => (
                          <li key={idx}>+ {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-destructive mb-2">
                        {l('단점', 'Nhược điểm', 'Cons')}
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {faction.cons.map((con, idx) => (
                          <li key={idx}>- {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${faction.bgColor}`}>
                    <span className="text-sm font-medium">
                      {l('추천 대상: ', 'Khuyến nghị cho: ', 'Recommended for: ')}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {faction.recommended}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Comparison Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {l('진영 비교표', 'Bảng so sánh phe phái', 'Faction Comparison')}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3">{l('항목', 'Hạng mục', 'Category')}</th>
                  <th className="text-center p-3 text-blue-400">{l('새벽의 날개', 'Cánh Bình Minh', 'Wings of Dawn')}</th>
                  <th className="text-center p-3 text-red-400">{l('블러디 로즈', 'Blood Rose', 'Blood Rose')}</th>
                  <th className="text-center p-3 text-yellow-400">{l('질서의 수호자', 'Người Bảo Vệ Trật Tự', 'Guard of Order')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: l('병종', 'Binh chủng', 'Troop Type'), values: [l('슈터', 'Xạ thủ', 'Shooter'), l('돌격', 'Đột kích', 'Assaulter'), l('라이더', 'Kỵ binh', 'Rider')] },
                  { label: l('카운터', 'Counter', 'Counters'), values: [l('블러디 로즈', 'Blood Rose', 'Blood Rose'), l('질서의 수호자', 'Người Bảo Vệ Trật Tự', 'Guard of Order'), l('새벽의 날개', 'Cánh Bình Minh', 'Wings of Dawn')] },
                  { label: l('서버 점유율', 'Tỷ lệ server', 'Server Pick Rate'), values: ['~20%', '~70%', '~10%'] },
                  { label: l('PvP 유리함', 'PvP lợi thế', 'PvP Advantage'), values: ['★★★★★', '★★★☆☆', '★★☆☆☆'] },
                  { label: l('추천도', 'Khuyến nghị', 'Recommendation'), values: ['★★★★★', '★★★☆☆', '★★★☆☆'] },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-border/50">
                    <td className="p-3 font-medium">{row.label}</td>
                    {row.values.map((val, idx) => (
                      <td key={idx} className="p-3 text-center text-muted-foreground">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Formation Recommendation */}
        <Card className="border-tip/30 bg-tip/5">
          <CardHeader>
            <CardTitle className="text-tip">
              {l('추천 진형 조합', 'Tổ hợp đội hình khuyến nghị', 'Recommended Team Compositions')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                {l('최적', 'Tối ưu', 'Optimal')}
              </Badge>
              <span className="text-sm">
                {l(
                  '새벽의 날개 3명 + 블러디 로즈 2명 (카운터 이점 + 크로스 시즌 시너지)',
                  '3 Cánh Bình Minh + 2 Blood Rose (lợi thế counter + synergy cross-season)',
                  '3 Wings of Dawn + 2 Blood Rose (counter advantage + cross-season synergy)'
                )}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-muted-foreground">
                {l('대안', 'Thay thế', 'Alternative')}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {l(
                  '질서의 수호자 3명 + 새벽의 날개 2명 (새벽의 날개 메타 서버용)',
                  '3 Người Bảo Vệ Trật Tự + 2 Cánh Bình Minh (cho server meta Cánh Bình Minh)',
                  '3 Guard of Order + 2 Wings of Dawn (for Wings of Dawn meta servers)'
                )}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Warning */}
        <div className="info-warning flex gap-3">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-warning">
              {l('주의: 단일 진영 조합', 'Cảnh báo: Đội hình đơn phe', 'Warning: Mono-Faction Teams')}
            </p>
            <p className="text-sm text-muted-foreground">
              {l(
                '한 진영 영웅 5명만 쓰는 것은 위험합니다. 상대 진영에게 하드 카운터 당할 수 있습니다. 한 진영 S티어 5명이 모두 필요해서 현실적이지 않습니다.',
                'Dùng 5 anh hùng cùng phe là nguy hiểm. Có thể bị hard counter bởi phe đối lập. Cần 5 anh hùng S-tier cùng phe nên không thực tế.',
                'Running 5 heroes from one faction is risky. You can get hard-countered by the opposing faction. Needing 5 S-tier heroes from one faction is also unrealistic.'
              )}
            </p>
          </div>
        </div>

        {/* Final Recommendation */}
        <div className="info-tip">
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-tip shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-tip">
                {l('최종 추천', 'Khuyến nghị cuối cùng', 'Final Recommendation')}
              </p>
              <p className="text-sm text-muted-foreground">
                {l(
                  '새벽의 날개(슈터)를 메인 진영으로 선택하세요. 서버의 약 70%가 블러디 로즈를 선택하기 때문에 자연스러운 PvP 이점이 있습니다. 영웅은 진형에 맞춰 슈터 중심으로 키우되, 서브 영웅으로 블러디 로즈 돌격 2명을 추가하면 최적의 조합이 됩니다.',
                  'Chọn Cánh Bình Minh (Xạ thủ) làm phe chính. ~70% server chọn Blood Rose nên có lợi thế PvP tự nhiên. Nuôi anh hùng tập trung vào Xạ thủ, thêm 2 Lính đột kích Blood Rose làm phụ để có tổ hợp tối ưu.',
                  'Pick Wings of Dawn (Shooter) as your main faction. ~70% of servers run Blood Rose, giving you a natural PvP advantage. Focus on building Shooter heroes, then add 2 Blood Rose Assaulters as subs for the optimal composition.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
