import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, History, CalendarDays } from 'lucide-react';

interface ChangelogEntry {
  date: string;
  isNew?: boolean;
  changes: {
    ko: string[];
    vi: string[];
  };
}

const changelogData: ChangelogEntry[] = [
  {
    date: '2025-02-08',
    isNew: true,
    changes: {
      ko: [
        '행운의 흔들기 페이지 전면 개편 (키 시스템, 마일스톤, 효율 비교)',
        '행운의 흔들기 정확한 비용: 1회 100다이아, 5회 500다이아',
        '연맹 대결 페이지 전면 개편 (6개 테마, 골든아워, 전면전비 스케줄)',
        '연맹 대결 모집티켓 구분 (2일차: 피난민, 4일차: 영웅)',
        '연맹 대결 일차 순서 수정 (1일차=월요일, 6일차=토요일)',
        '골든아워 시간대 수정 (Apoc 08:00-12:00, 20:00-00:00)',
        '방문자 카운터 한국시간(KST) 기준으로 변경',
        '월간 방문자 카운터 버그 수정 (2월 등 31일 미만 달)',
      ],
      vi: [
        'Cải tiến trang Lucky Shake (hệ thống Key, Milestone, so sánh hiệu quả)',
        'Chi phí Lucky Shake chính xác: 100 diamond/lần, 500 diamond/5 lần',
        'Cải tiến trang Alliance Duel (6 theme, Golden Hour, lịch Full Prep)',
        'Phân biệt vé tuyển mộ Alliance Duel (Ngày 2: tị nạn, Ngày 4: anh hùng)',
        'Sửa thứ tự ngày Alliance Duel (Ngày 1=Thứ hai, Ngày 6=Thứ bảy)',
        'Sửa giờ Golden Hour (Apoc 08:00-12:00, 20:00-00:00)',
        'Đổi bộ đếm khách theo giờ Hàn Quốc (KST)',
        'Sửa lỗi bộ đếm khách hàng tháng (tháng có ít hơn 31 ngày)',
      ],
    },
  },
  {
    date: '2025-02-01',
    changes: {
      ko: [
        '업데이트 내역 페이지 추가',
        'HQ 업그레이드 요구사항 데이터 수정',
        '사이드바 아코디언 동작 개선',
        '방문자 카운터 로딩 최적화',
      ],
      vi: [
        'Thêm trang lịch sử cập nhật',
        'Sửa dữ liệu yêu cầu nâng cấp HQ',
        'Cải thiện hoạt động accordion sidebar',
        'Tối ưu hóa tải bộ đếm khách truy cập',
      ],
    },
  },
  {
    date: '2025-01-31',
    changes: {
      ko: [
        '용어사전 한국어 중심 개선',
        'PC 버전 홈 버튼 추가',
        '검색 기능 구현',
      ],
      vi: [
        'Cải thiện từ điển thuật ngữ theo tiếng Hàn',
        'Thêm nút Home cho phiên bản PC',
        'Triển khai chức năng tìm kiếm',
      ],
    },
  },
  {
    date: '2025-01-30',
    changes: {
      ko: [
        'PWA 지원 추가 (홈 화면 추가 기능)',
        '이벤트 페이지 대폭 확장 (전면전비, 난폭 두목, 좀비폭군, 좀비공성, 가챠 고, 럭키 할인, 협곡쟁탈전)',
        '한국어 게임 용어 전면 수정',
      ],
      vi: [
        'Thêm hỗ trợ PWA (thêm vào màn hình chính)',
        'Mở rộng các trang sự kiện (Full Prep, Furylord, Tyrant, Zombie Siege, Gacha Go, Lucky Discounter, Canyon Clash)',
        'Sửa đổi toàn bộ thuật ngữ game tiếng Hàn',
      ],
    },
  },
  {
    date: '2025-01-29',
    changes: {
      ko: [
        '다국어 지원 개선 (한국어/베트남어)',
        '네비게이션 구조 개선',
        '모바일 반응형 디자인 수정',
      ],
      vi: [
        'Cải thiện hỗ trợ đa ngôn ngữ (Hàn/Việt)',
        'Cải thiện cấu trúc điều hướng',
        'Sửa thiết kế responsive cho mobile',
      ],
    },
  },
  {
    date: '2025-01-28',
    changes: {
      ko: [
        '영웅 티어표 페이지 추가',
        '장비 강화 가이드 추가',
        '리딤 코드 페이지 추가',
      ],
      vi: [
        'Thêm trang bảng xếp hạng anh hùng',
        'Thêm hướng dẫn nâng cấp trang bị',
        'Thêm trang mã đổi thưởng',
      ],
    },
  },
  {
    date: '2025-01-27',
    changes: {
      ko: [
        '사이트 초기 런칭',
        '입문 가이드 섹션 추가',
        '성장 가이드 섹션 추가',
        'FAQ 페이지 추가',
      ],
      vi: [
        'Ra mắt website',
        'Thêm phần hướng dẫn cơ bản',
        'Thêm phần hướng dẫn phát triển',
        'Thêm trang FAQ',
      ],
    },
  },
];

// Check if a date is within the last 7 days
function isRecent(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 7;
}

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ChangelogContent locale={locale} />;
}

function ChangelogContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const isKorean = locale === 'ko';

  return (
    <div className="py-8 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="badge-basic">
              {t('difficulty.basic')}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              3 {t('common.minutes')}
            </span>
          </div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <History className="h-8 w-8 text-highlight" />
            {isKorean ? '업데이트 내역' : 'Lịch sử cập nhật'}
          </h1>
          <p className="text-muted-foreground">
            {isKorean
              ? '사이트의 최신 업데이트 내역을 확인하세요.'
              : 'Xem lịch sử cập nhật mới nhất của website.'}
          </p>
        </div>

        {/* Changelog List */}
        <div className="space-y-4">
          {changelogData.map((entry, idx) => {
            const showNewBadge = entry.isNew || isRecent(entry.date);
            const changes = isKorean ? entry.changes.ko : entry.changes.vi;

            return (
              <Card key={idx}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <CalendarDays className="h-5 w-5 text-muted-foreground" />
                    <span className="font-semibold text-lg">{entry.date}</span>
                    {showNewBadge && (
                      <Badge className="bg-highlight text-highlight-foreground">
                        NEW
                      </Badge>
                    )}
                  </div>
                  <ul className="space-y-2 ml-8">
                    {changes.map((change, changeIdx) => (
                      <li
                        key={changeIdx}
                        className="text-muted-foreground flex items-baseline gap-2"
                      >
                        <span className="text-highlight">•</span>
                        <span>{change}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
