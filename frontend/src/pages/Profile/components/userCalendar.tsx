import Calendar from 'react-calendar';
import { Box, Tooltip } from '@mui/material';
import EmotionIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import 'react-calendar/dist/Calendar.css';
import { useGetUserPosts } from '../../../hooks/UsePost';
import { useMemo } from 'react';

const CalendarContainer = styled('div')(({ theme }) => ({
    '.react-calendar': {
        width: '100%',
        maxWidth: 800,
        borderRadius: 16,
        boxShadow: theme.shadows[2],
        padding: theme.spacing(2),
        fontFamily: theme.typography.fontFamily,
        border: '1px solid #ddd',
    },

    '.react-calendar__navigation': {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        borderRadius: 8,
        padding: theme.spacing(1),
        button: {
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            padding: theme.spacing(1),
            borderRadius: 6,
            transition: 'background-color 0.2s ease',
            '&:hover': {
                color: theme.palette.primary.main,
            },
        },
    },

    '.react-calendar__month-view__weekdays': {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 600,
        fontSize: 14,
    },

    '.react-calendar__month-view__weekdays__weekday abbr': {
        color: theme.palette.primary.main,
        textDecoration: 'none',
    },

    '.react-calendar__tile': {
        height: 80,
        fontSize: 16,
        padding: theme.spacing(1),
        textAlign: 'center',
        lineHeight: 1.5,
        borderRadius: 8,
        transition: 'all 0.2s ease',
    },

    '.react-calendar__tile--active': {
        backgroundColor: 'transparent !important',
        color: theme.palette.primary.main,
        borderRadius: 8,
        fontWeight: 600,
    },

    '.react-calendar__tile--now': {
        backgroundColor: 'transparent !important',
        border: `2px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
        borderRadius: 8,
        fontWeight: 600,
    },
}));

const UserCalendar = () => {
    const { posts, isLoading: postsLoading, error } = useGetUserPosts();

    const getDateFromSeconds = (seconds: number) => new Date(seconds * 1000);

    const formatDate = (date: Date): string => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const emotionDataMap = useMemo(() => {
        const map: Record<string, { color: string; name: string; value: number; count: number }> = {};

        posts.forEach((post) => {
            if (!Array.isArray(post.emotionAnalysis) || post.emotionAnalysis.length === 0) return;

            const date = formatDate(getDateFromSeconds(post.createdAt.seconds));
            const maxEmotion = post.emotionAnalysis.reduce((max, curr) => (curr.value > max.value ? curr : max));

            if (!map[date]) {
                map[date] = {
                    color: maxEmotion.color,
                    name: maxEmotion.name,
                    value: maxEmotion.value,
                    count: 1,
                };
            } else {
                if (maxEmotion.value > map[date].value) {
                    map[date].color = maxEmotion.color;
                    map[date].name = maxEmotion.name;
                    map[date].value = maxEmotion.value;
                }
                map[date].count += 1;
            }
        });

        return map;
    }, [posts]);

    return (
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
            <CalendarContainer>
                <Calendar
                    locale="en-US"
                    tileContent={({ date }) => {
                        const formatted = formatDate(date);
                        const emotion = emotionDataMap[formatted];

                        return emotion ? (
                            <Tooltip
                                title={
                                    <Box>
                                        <Box>
                                            Posts: <span>{emotion.count}</span>
                                        </Box>
                                        <Box>
                                            Top Emotion:{' '}
                                            <span>
                                                {emotion.name} ({emotion.value}%)
                                            </span>
                                        </Box>
                                    </Box>
                                }
                                arrow
                                componentsProps={{
                                    tooltip: {
                                        sx: {
                                            fontSize: 14,
                                            padding: '8px 12px',
                                            borderRadius: 2,
                                        },
                                    },
                                }}
                                PopperProps={{
                                    modifiers: [
                                        {
                                            name: 'arrow',
                                            options: {
                                                padding: 5,
                                            },
                                        },
                                    ],
                                }}
                            >
                                <Box sx={{ textAlign: 'center', mt: 1 }}>
                                    <EmotionIcon sx={{ fontSize: 28, color: emotion.color }} />
                                </Box>
                            </Tooltip>
                        ) : null;
                    }}
                    onClickDay={undefined}
                />
            </CalendarContainer>
        </Box>
    );
};

export default UserCalendar;
