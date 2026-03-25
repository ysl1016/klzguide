import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, FlaskConical, AlertTriangle, Lightbulb, Shield } from 'lucide-react';

export default async function FieldResearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FieldResearchContent locale={locale} />;
}

function FieldResearchContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  const nodes = [
    { name: isKorean ? '야전훈련 I' : 'Field Training I', levels: '1-10', cost: '10,180' },
    { name: isKorean ? '위장코팅 I' : 'Camo Coating I', levels: '1-10', cost: '10,180' },
    { name: isKorean ? '기동력 강화' : 'Mobility Enhancement', levels: '1-10', cost: '15,270' },
    { name: isKorean ? '근접전투' : 'Melee Combat', levels: '1-10', cost: '15,270' },
    { name: isKorean ? '무기 업그레이드' : 'Weapon Upgrading', levels: '1-10', cost: '15,270' },
    { name: isKorean ? '사격훈련' : 'Target Training', levels: '1-5', cost: '8,220' },
    { name: isKorean ? '무기조립' : 'Arms Assembly', levels: '1-5', cost: '8,220' },
    { name: isKorean ? '빠른 조립' : 'Quick Assembly', levels: '1-5', cost: '8,220' },
    { name: isKorean ? '강화 장갑' : 'Stronger Armor', levels: '1-10', cost: '30,700' },
    { name: isKorean ? '방패 업그레이드' : 'Shield Upgrade', levels: '1-10', cost: '30,700' },
    { name: isKorean ? '전술 엄폐' : 'Tactical Cover', levels: '1-10', cost: '30,700' },
    { name: isKorean ? '야전훈련 II' : 'Field Training II', levels: '1-20', cost: '154,600' },
    { name: isKorean ? '위장코팅 II' : 'Camo Coating II', levels: '1-20', cost: '154,600' },
    { name: isKorean ? '에너지 실드' : 'Recharge Shield', levels: '1-10', cost: '102,300' },
  ];

  const checkpoints = [
    { label: isKorean ? '초기 쌍 (노드 1-2)' : 'Opening Pair (Node 1-2)', cost: '20,360', color: 'text-green-400' },
    { label: isKorean ? '전투 확장 (노드 3-11)' : 'Combat Spread (Node 3-11)', cost: '162,570', color: 'text-blue-400' },
    { label: isKorean ? '최종 벽 (노드 12-14)' : 'Final Wall (Node 12-14)', cost: '411,500', color: 'text-red-400' },
  ];

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-advanced">
              {t('difficulty.advanced')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              10 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <FlaskConical className="h-8 w-8 text-highlight" />
            {isKorean ? '야전연구 비용표' : 'Chi phí Nghiên cứu Dã chiến'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '야전연구 (Field Research) 전체 14노드/145레벨의 경찰휘장 비용 상세. 도시함락 100% 완료 후 해금.'
              : 'Chi phí badge toàn bộ 14 node/145 level Field Research. Mở sau khi hoàn thành 100% Siege to Seize.'}
          </p>
        </div>

        {/* TL;DR */}
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">{isKorean ? '핵심 요약' : 'Tóm tắt'}</h2>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• {isKorean ? '총 경찰휘장: 594,430개 (14노드, 145레벨)' : 'Tổng badge: 594,430 (14 node, 145 level)'}</li>
              <li>• {isKorean ? '최종 노드 에너지 실드: 102,300개 단독 소모' : 'Node cuối Recharge Shield: 102,300 badge riêng'}</li>
              <li>• {isKorean ? '마지막 3노드(야전훈련II, 위장코팅II, 에너지 실드)가 전체의 69% 차지' : '3 node cuối (Field Training II, Camo Coating II, Recharge Shield) chiếm 69% tổng'}</li>
              <li>• {isKorean ? '해금 조건: 도시함락 (Siege to Seize) 100% 완료' : 'Điều kiện mở: Siege to Seize hoàn thành 100%'}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Cost Checkpoints */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '구간별 비용 요약' : 'Tóm tắt chi phí theo giai đoạn'}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {checkpoints.map((cp, idx) => (
              <Card key={idx}>
                <CardContent className="p-4 text-center">
                  <p className={`font-semibold text-sm ${cp.color}`}>{cp.label}</p>
                  <p className={`text-2xl font-bold mt-2 ${cp.color}`}>{cp.cost}</p>
                  <p className="text-xs text-muted-foreground mt-1">{isKorean ? '경찰휘장' : 'badge'}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isKorean ? '총합' : 'Tổng'}: <span className="text-xl font-bold text-highlight">594,430</span> {isKorean ? '경찰휘장' : 'badge'}
            </p>
          </div>
        </section>

        {/* Full Node Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {isKorean ? '노드별 상세 비용' : 'Chi phí chi tiết từng node'}
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-muted-foreground font-medium">#</th>
                      <th className="text-left py-2 px-3 text-muted-foreground font-medium">{isKorean ? '노드명' : 'Tên node'}</th>
                      <th className="text-center py-2 px-3 text-muted-foreground font-medium">{isKorean ? '레벨' : 'Level'}</th>
                      <th className="text-right py-2 px-3 text-muted-foreground font-medium">{isKorean ? '경찰휘장' : 'Badge'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nodes.map((node, idx) => (
                      <tr key={idx} className={`border-b border-border/50 ${idx >= 11 ? 'bg-red-500/5' : ''}`}>
                        <td className="py-2 px-3 text-muted-foreground">{idx + 1}</td>
                        <td className="py-2 px-3 font-medium">{node.name}</td>
                        <td className="py-2 px-3 text-center font-mono text-muted-foreground">{node.levels}</td>
                        <td className={`py-2 px-3 text-right font-mono ${idx >= 11 ? 'text-red-400 font-bold' : 'text-yellow-400'}`}>{node.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-border">
                      <td colSpan={3} className="py-2 px-3 font-bold">{isKorean ? '총합' : 'Tổng'}</td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-highlight">594,430</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Final Node Warning */}
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-400 shrink-0" />
              <div>
                <p className="font-semibold text-amber-400 mb-1">
                  {isKorean ? '최종 벽: 마지막 3노드 = 411,500 경찰휘장' : 'Bức tường cuối: 3 node cuối = 411,500 badge'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '야전훈련 II (154,600)와 위장코팅 II (154,600)는 각각 20레벨까지 올려야 하며, 최종 에너지 실드 (102,300)에 도달하기 전 엄청난 경찰휘장이 소모됩니다. 장기 계획을 세우고 경찰휘장을 꾸준히 모으세요.'
                    : 'Field Training II (154,600) và Camo Coating II (154,600) mỗi cái cần lên level 20, tiêu thụ badge khổng lồ trước khi đến Recharge Shield (102,300). Lên kế hoạch dài hạn và tích badge đều đặn.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recharge Shield */}
        <Card className="border-green-500/30 bg-green-500/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Shield className="h-6 w-6 text-green-400 shrink-0" />
              <div>
                <p className="font-semibold text-green-400 mb-1">
                  {isKorean ? '최종 목표: 에너지 실드 (Recharge Shield)' : 'Mục tiêu cuối: Recharge Shield'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isKorean
                    ? '에너지 실드는 야전연구의 최종 노드입니다. 전쟁수호의 에너지 실드와 함께 사용하면 HP%가 배수로 적용되어 35~40% 추가 HP를 확보합니다. 전투에서 게임 체인저 역할을 합니다.'
                    : 'Recharge Shield là node cuối cùng của Field Research. Kết hợp với Recharge Shield của Peace Shield, HP% nhân lên = 35-40% HP thêm. Game changer trong chiến đấu.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">{isKorean ? '팁' : 'Mẹo'}</h2>
          <div className="grid gap-3">
            {[
              isKorean ? '경찰휘장은 연맹 대결 3일차(과학의 시대)에 집중 생산하세요 — 주간 10,000개 이상 가능' : 'Tập trung tạo badge ngày 3 AD (Age of Science) — 10,000+/tuần',
              isKorean ? '행운 할인 90%로 경찰휘장 구매 = 특권상점 대비 5배 효율' : 'Mua badge với Lucky Discounter 90% = gấp 5 lần VIP Shop',
              isKorean ? '초기 11노드 (182,930)를 먼저 완료하면 전투력이 크게 상승합니다' : 'Hoàn thành 11 node đầu (182,930) trước để tăng CP đáng kể',
              isKorean ? '야전연구는 장기 프로젝트입니다 — 꾸준한 경찰휘장 축적이 핵심' : 'Field Research là dự án dài hạn — tích badge đều đặn là chìa khóa',
            ].map((tip, idx) => (
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
