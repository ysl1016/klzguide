'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
  Calculator,
  Building2,
  FlaskConical,
  Users,
  Wrench,
  Swords,
  HelpCircle,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Info,
} from 'lucide-react';

export default function CPCalculatorPage() {
  const t = useTranslations();
  const locale = useLocale();
  const l = (ko: string, vi: string, en: string) => ({ ko, vi, en }[locale as string] ?? en);

  const [structurePower, setStructurePower] = useState<number>(0);
  const [techPower, setTechPower] = useState<number>(0);
  const [troopPower, setTroopPower] = useState<number>(0);
  const [heroPower, setHeroPower] = useState<number>(0);
  const [vehiclePower, setVehiclePower] = useState<number>(0);
  const [targetMilestone, setTargetMilestone] = useState<number>(0);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('klz-cp-calculator');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.structure) setStructurePower(data.structure);
        if (data.tech) setTechPower(data.tech);
        if (data.troop) setTroopPower(data.troop);
        if (data.hero) setHeroPower(data.hero);
        if (data.vehicle) setVehiclePower(data.vehicle);
        if (data.target) setTargetMilestone(data.target);
      }
    } catch {}
  }, []);

  // Save to localStorage
  useEffect(() => {
    const total = structurePower + techPower + troopPower + heroPower + vehiclePower;
    if (total > 0) {
      localStorage.setItem('klz-cp-calculator', JSON.stringify({
        structure: structurePower, tech: techPower, troop: troopPower,
        hero: heroPower, vehicle: vehiclePower, target: targetMilestone,
      }));
    }
  }, [structurePower, techPower, troopPower, heroPower, vehiclePower, targetMilestone]);

  const totalPower = structurePower + techPower + troopPower + heroPower + vehiclePower;

  const milestones = [
    { label: '500K', value: 500000 },
    { label: '1M', value: 1000000 },
    { label: '2M', value: 2000000 },
    { label: '5M', value: 5000000 },
    { label: '10M', value: 10000000 },
    { label: '30M', value: 30000000 },
    { label: '50M', value: 50000000 },
    { label: '100M', value: 100000000 },
  ];

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const powerCategories = [
    {
      key: 'structure',
      name: l('건물', 'Công trình', 'Structures'),
      icon: Building2,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      value: structurePower,
      setValue: setStructurePower,
      description: l(
        '본부(HQ), 연구소, 캠프 등 건물 레벨에서 발생',
        'Từ level các công trình như HQ, Lab, Camp',
        'From building levels such as HQ, Lab, Camp'
      ),
      howToIncrease: l(
        '본부(HQ)와 연구소 업그레이드 우선',
        'Ưu tiên nâng HQ và Lab',
        'Prioritize upgrading HQ and Research Lab'
      ),
      idealRange: '15-20%',
    },
    {
      key: 'tech',
      name: l('기술', 'Công nghệ', 'Technology'),
      icon: FlaskConical,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      value: techPower,
      setValue: setTechPower,
      description: l(
        '연구소에서 완료한 연구 수에서 발생',
        'Từ số nghiên cứu hoàn thành trong Lab',
        'From completed research in the Lab'
      ),
      howToIncrease: l(
        '연맹표창(AR) 연구 먼저 완료',
        'Hoàn thành NC Alliance Recognition trước',
        'Complete Alliance Recognition (AR) research first'
      ),
      idealRange: '10-15%',
    },
    {
      key: 'troop',
      name: l('병력', 'Quân đội', 'Troops'),
      icon: Swords,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      value: troopPower,
      setValue: setTroopPower,
      description: l(
        '병사 수와 티어(레벨)에서 발생',
        'Từ số lượng và tier (level) lính',
        'From troop count and tier (level)'
      ),
      howToIncrease: l(
        '훈련 대기열 24시간 유지, 고티어 병사 우선',
        'Giữ hàng đợi huấn luyện 24/7, ưu tiên lính tier cao',
        'Keep training queue running 24/7, prioritize high-tier troops'
      ),
      idealRange: '40-50%',
    },
    {
      key: 'hero',
      name: l('영웅', 'Anh hùng', 'Heroes'),
      icon: Users,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      value: heroPower,
      setValue: setHeroPower,
      description: l(
        '영웅 레벨, 성급, 스킬, 장비에서 발생',
        'Từ level, sao, kỹ năng, trang bị anh hùng',
        'From hero level, stars, skills, and gear'
      ),
      howToIncrease: l(
        '메인 5명 영웅에만 집중 투자',
        'Chỉ tập trung đầu tư 5 anh hùng chính',
        'Focus investment on your main 5 heroes only'
      ),
      idealRange: '15-25%',
    },
    {
      key: 'vehicle',
      name: l('차량', 'Xe', 'Vehicles'),
      icon: Wrench,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      value: vehiclePower,
      setValue: setVehiclePower,
      description: l(
        '차량 레벨, 개조, 부품에서 발생',
        'Từ level xe, cải tạo, linh kiện',
        'From vehicle level, modifications, and parts'
      ),
      howToIncrease: l(
        '부품 레벨 100+ 목표, 타이탄(Titan) 우선',
        'Mục tiêu linh kiện level 100+, ưu tiên Titan',
        'Aim for parts level 100+, prioritize Titan'
      ),
      idealRange: '5-10%',
    },
  ];

  // HQ별 예상 전투력 기준
  const hqBenchmarks = [
    { hq: 25, cp: '5M', cpNum: 5000000 },
    { hq: 28, cp: '15M', cpNum: 15000000 },
    { hq: 30, cp: '30M', cpNum: 30000000 },
    { hq: 32, cp: '50M', cpNum: 50000000 },
    { hq: 35, cp: '80M', cpNum: 80000000 },
    { hq: 38, cp: '120M', cpNum: 120000000 },
  ];

  const getPercentage = (value: number) => {
    if (totalPower === 0) return 0;
    return ((value / totalPower) * 100).toFixed(1);
  };

  const getPercentageNum = (value: number) => {
    if (totalPower === 0) return 0;
    return (value / totalPower) * 100;
  };

  // 밸런스 분석
  const getBalanceAnalysis = () => {
    if (totalPower === 0) return null;

    const troopPercent = getPercentageNum(troopPower);
    const structurePercent = getPercentageNum(structurePower);
    const heroPercent = getPercentageNum(heroPower);
    const techPercent = getPercentageNum(techPower);
    const vehiclePercent = getPercentageNum(vehiclePower);

    const issues: { type: 'warning' | 'info'; message: string }[] = [];
    const goods: string[] = [];

    // 병력 체크 (40-50% 이상적)
    if (troopPercent < 30) {
      issues.push({
        type: 'warning',
        message: l(
          '병력 비율이 낮습니다. 훈련을 24시간 유지하세요.',
          'Tỷ lệ quân đội thấp. Giữ huấn luyện 24/7.',
          'Troop ratio is low. Keep training running 24/7.'
        ),
      });
    } else if (troopPercent >= 40 && troopPercent <= 55) {
      goods.push(l('병력 비율이 적절합니다', 'Tỷ lệ quân đội tốt', 'Troop ratio is good'));
    } else if (troopPercent > 60) {
      issues.push({
        type: 'info',
        message: l(
          '병력 비율이 높습니다. 다른 영역도 투자하세요.',
          'Tỷ lệ quân đội cao. Đầu tư thêm các lĩnh vực khác.',
          'Troop ratio is high. Invest in other areas too.'
        ),
      });
    }

    // 건물 체크 (15-20% 이상적)
    if (structurePercent < 10) {
      issues.push({
        type: 'warning',
        message: l(
          '건물 전투력이 낮습니다. 본부(HQ) 업그레이드를 진행하세요.',
          'CP công trình thấp. Tiến hành nâng cấp HQ.',
          'Structure CP is low. Proceed with HQ upgrades.'
        ),
      });
    } else if (structurePercent >= 15 && structurePercent <= 25) {
      goods.push(l('건물 비율이 적절합니다', 'Tỷ lệ công trình tốt', 'Structure ratio is good'));
    }

    // 영웅 체크 (15-25% 이상적)
    if (heroPercent < 10) {
      issues.push({
        type: 'info',
        message: l(
          '영웅 전투력이 낮습니다. 메인 5명에 집중 투자하세요.',
          'CP anh hùng thấp. Tập trung đầu tư 5 anh hùng chính.',
          'Hero CP is low. Focus investment on your main 5 heroes.'
        ),
      });
    } else if (heroPercent >= 15 && heroPercent <= 30) {
      goods.push(l('영웅 비율이 적절합니다', 'Tỷ lệ anh hùng tốt', 'Hero ratio is good'));
    }

    // 기술 체크
    if (techPercent < 5) {
      issues.push({
        type: 'info',
        message: l(
          '기술 전투력이 낮습니다. 연구를 계속 진행하세요.',
          'CP công nghệ thấp. Tiếp tục nghiên cứu.',
          'Technology CP is low. Keep researching.'
        ),
      });
    }

    // 차량 체크
    if (vehiclePercent < 3 && totalPower > 10000000) {
      issues.push({
        type: 'info',
        message: l(
          '차량 전투력이 낮습니다. 부품 레벨업을 고려하세요.',
          'CP xe thấp. Cân nhắc nâng cấp linh kiện.',
          'Vehicle CP is low. Consider upgrading parts.'
        ),
      });
    }

    return { issues, goods };
  };

  // 현재 HQ 레벨 추정
  const estimateHQLevel = () => {
    if (totalPower === 0) return null;
    for (let i = hqBenchmarks.length - 1; i >= 0; i--) {
      if (totalPower >= hqBenchmarks[i].cpNum) {
        return hqBenchmarks[i].hq;
      }
    }
    return hqBenchmarks[0].hq - 3;
  };

  const analysis = getBalanceAnalysis();
  const estimatedHQ = estimateHQLevel();

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-basic">
              {t('difficulty.basic')}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Calculator className="h-8 w-8 text-highlight" />
            {l('CP 계산기', 'Máy tính CP', 'CP Calculator')}
          </h1>
          <p className="text-muted-foreground">
            {l(
              '전투력 구성 요소를 입력하여 총 CP와 비율을 확인하고, 밸런스 분석을 받아보세요.',
              'Nhập các thành phần sức mạnh để kiểm tra tổng CP, tỷ lệ và nhận phân tích cân bằng.',
              'Enter your power components to check total CP, ratios, and get a balance analysis.'
            )}
          </p>
        </div>

        {/* How to Find CP - 초보자 가이드 */}
        <Card className="border-info/30 bg-info/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg text-info">
              <HelpCircle className="h-5 w-5" />
              {l('CP 확인 방법', 'Cách xem CP', 'How to Check CP')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              {l(
                '게임 내에서 다음 경로로 CP를 확인할 수 있습니다:',
                'Bạn có thể xem CP trong game theo đường dẫn sau:',
                'You can check your CP in-game via the following path:'
              )}
            </p>
            <div className="bg-background/50 rounded-lg p-3 space-y-1">
              <p className="font-mono">
                {l(
                  '프로필 아이콘 (좌상단) → 전투력 상세 보기',
                  'Icon profile (góc trái trên) → Xem chi tiết sức mạnh',
                  'Profile icon (top left) → View power details'
                )}
              </p>
            </div>
            <p className="text-xs">
              {l(
                '※ 각 카테고리별 전투력이 표시됩니다. 해당 숫자를 아래에 입력하세요.',
                '※ CP từng loại sẽ được hiển thị. Nhập số đó vào bên dưới.',
                '※ CP for each category will be displayed. Enter those numbers below.'
              )}
            </p>
          </CardContent>
        </Card>

        {/* Total Power Display */}
        <Card className="border-highlight/50 bg-highlight/5">
          <CardContent className="p-6">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                {l('총 전투력', 'Tổng CP', 'Total CP')}
              </p>
              <p className="text-5xl font-bold text-highlight">{formatNumber(totalPower)}</p>
              {estimatedHQ && totalPower > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  {l(
                    `예상 본부(HQ) 레벨: ${estimatedHQ}+`,
                    `Dự đoán level HQ: ${estimatedHQ}+`,
                    `Estimated HQ level: ${estimatedHQ}+`
                  )}
                </p>
              )}
            </div>

            {/* HQ Benchmarks */}
            {totalPower > 0 && (
              <div className="border-t border-border/50 pt-4 mt-4">
                <p className="text-xs text-muted-foreground text-center mb-3">
                  {l('본부(HQ) 레벨별 예상 전투력', 'CP dự kiến theo level HQ', 'Expected CP by HQ level')}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {hqBenchmarks.map((bench) => (
                    <div
                      key={bench.hq}
                      className={`px-3 py-1 rounded-full text-xs ${
                        totalPower >= bench.cpNum
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      HQ{bench.hq}: {bench.cp}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Milestone Target */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-highlight" />
              {l('목표 마일스톤', 'Mục tiêu mốc', 'Target Milestone')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {milestones.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setTargetMilestone(m.value === targetMilestone ? 0 : m.value)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors',
                    targetMilestone === m.value
                      ? 'bg-highlight/20 text-highlight border-highlight/50'
                      : totalPower >= m.value
                        ? 'bg-green-500/10 text-green-400 border-green-500/30'
                        : 'bg-muted/50 text-muted-foreground border-border hover:bg-muted'
                  )}
                >
                  {totalPower >= m.value ? '✓ ' : ''}{m.label}
                </button>
              ))}
            </div>
            {targetMilestone > 0 && totalPower > 0 && (
              <div className="p-3 rounded-lg bg-secondary/30 border">
                {totalPower >= targetMilestone ? (
                  <p className="text-sm text-green-400 font-medium">
                    {l(
                      `목표 달성! 현재 ${formatNumber(totalPower)} / ${formatNumber(targetMilestone)}`,
                      `Đạt mục tiêu! Hiện tại ${formatNumber(totalPower)} / ${formatNumber(targetMilestone)}`,
                      `Goal reached! Current ${formatNumber(totalPower)} / ${formatNumber(targetMilestone)}`
                    )}
                  </p>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {l(
                        `목표까지 ${formatNumber(targetMilestone - totalPower)} 남음`,
                        `Còn ${formatNumber(targetMilestone - totalPower)} để đạt mục tiêu`,
                        `${formatNumber(targetMilestone - totalPower)} remaining to reach goal`
                      )}
                    </p>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-highlight rounded-full transition-all"
                        style={{ width: `${Math.min((totalPower / targetMilestone) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      {((totalPower / targetMilestone) * 100).toFixed(1)}%
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Power Inputs with Descriptions */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Target className="h-5 w-5 text-highlight" />
            {l('전투력 입력', 'Nhập CP', 'Enter CP')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {powerCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Card key={cat.key} className={cat.bgColor}>
                  <CardHeader className="pb-2">
                    <CardTitle className={`flex items-center gap-2 text-lg ${cat.color}`}>
                      <Icon className="h-5 w-5" />
                      {cat.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">{cat.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Input
                        id={cat.key}
                        type="number"
                        value={cat.value || ''}
                        onChange={(e) => cat.setValue(Number(e.target.value) || 0)}
                        placeholder="0"
                        className="text-lg"
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {l('비율', 'Tỷ lệ', 'Ratio')}
                      </span>
                      <span className={cat.color}>{getPercentage(cat.value)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${cat.color.replace('text-', 'bg-')}`}
                        style={{ width: `${Math.min(Number(getPercentage(cat.value)), 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {l('이상적 비율', 'Tỷ lệ lý tưởng', 'Ideal ratio')}: {cat.idealRange}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Balance Analysis */}
        {analysis && totalPower > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-highlight" />
                {l('밸런스 분석', 'Phân tích cân bằng', 'Balance Analysis')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysis.goods.length > 0 && (
                <div className="space-y-2">
                  {analysis.goods.map((good, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-green-400">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      <span>{good}</span>
                    </div>
                  ))}
                </div>
              )}
              {analysis.issues.length > 0 && (
                <div className="space-y-2">
                  {analysis.issues.map((issue, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-2 text-sm ${
                        issue.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                      }`}
                    >
                      {issue.type === 'warning' ? (
                        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                      ) : (
                        <Info className="h-4 w-4 shrink-0 mt-0.5" />
                      )}
                      <span>{issue.message}</span>
                    </div>
                  ))}
                </div>
              )}
              {analysis.issues.length === 0 && analysis.goods.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  {l(
                    '더 정확한 분석을 위해 모든 카테고리에 값을 입력하세요.',
                    'Nhập giá trị cho tất cả các loại để phân tích chính xác hơn.',
                    'Enter values for all categories for a more accurate analysis.'
                  )}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Power Distribution Chart */}
        {totalPower > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{l('전투력 분포', 'Phân bố CP', 'CP Distribution')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {powerCategories
                  .filter((cat) => cat.value > 0)
                  .sort((a, b) => b.value - a.value)
                  .map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <div key={cat.key} className="flex items-center gap-3">
                        <Icon className={`h-5 w-5 ${cat.color} shrink-0`} />
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{cat.name}</span>
                            <span className={cat.color}>
                              {formatNumber(cat.value)} ({getPercentage(cat.value)}%)
                            </span>
                          </div>
                          <div className="h-3 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full ${cat.color.replace('text-', 'bg-')}`}
                              style={{ width: `${Math.min(Number(getPercentage(cat.value)), 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* How to Increase Each Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-tip" />
              {l('카테고리별 올리는 방법', 'Cách tăng từng loại', 'How to Increase Each Category')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {powerCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.key} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <Icon className={`h-5 w-5 ${cat.color} shrink-0 mt-0.5`} />
                    <div>
                      <p className={`font-medium ${cat.color}`}>{cat.name}</p>
                      <p className="text-sm text-muted-foreground">{cat.howToIncrease}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="border-tip/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-tip">
              <Lightbulb className="h-5 w-5" />
              {l('초보자 팁', 'Mẹo cho người mới', 'Beginner Tips')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-tip">•</span>
                {l(
                  '균형 잡힌 성장이 중요합니다. 한 카테고리에 치우치지 않고 모든 요소를 고르게 발전시키세요.',
                  'Phát triển cân bằng rất quan trọng. Đừng nghiêng về một loại.',
                  'Balanced growth is important. Do not lean too heavily into one category.'
                )}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tip">•</span>
                {l(
                  '병력 전투력 48M + 건물 전투력 10M 조합으로 98-99%의 플레이어를 이길 수 있습니다.',
                  'Kết hợp 48M quân + 10M công trình có thể thắng 98-99% người chơi.',
                  'A combination of 48M troop CP + 10M structure CP can beat 98-99% of players.'
                )}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tip">•</span>
                {l(
                  '병력 비율이 40-50%가 되도록 훈련을 지속적으로 유지하세요.',
                  'Duy trì huấn luyện liên tục để tỷ lệ quân đội đạt 40-50%.',
                  'Keep training continuously so troop ratio reaches 40-50%.'
                )}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-tip">•</span>
                {l(
                  '연맹표창(AR) 연구를 먼저 완료하면 모든 보상이 2배가 됩니다.',
                  'Hoàn thành NC Alliance Recognition trước để nhân đôi mọi phần thưởng.',
                  'Complete Alliance Recognition (AR) research first to double all rewards.'
                )}
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
