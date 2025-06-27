import Calendar from 'react-calendar';
import { Box } from '@mui/material';
import EmotionIcon from '@mui/icons-material/Favorite';
import { styled } from '@mui/material/styles';
import 'react-calendar/dist/Calendar.css';
import { useUserPosts } from '../../../hooks/UsePost';
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
    const { posts, isLoading: postsLoading, error } = useUserPosts();

    const getDateFromSeconds = (seconds: number) => new Date(seconds * 1000);
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const emotionColorMap = useMemo(() => {
        const map: Record<string, { color: string; name: string; value: number }> = {};

        posts.forEach((post) => {
            if (!Array.isArray(post.emotionAnalysis) || post.emotionAnalysis.length === 0) return;

            const date = formatDate(getDateFromSeconds(post.createdAt.seconds));
            const maxEmotion = post.emotionAnalysis.reduce((max, curr) => (curr.value > max.value ? curr : max));

            if (!map[date] || maxEmotion.value > map[date].value) {
                map[date] = {
                    color: maxEmotion.color,
                    name: maxEmotion.name,
                    value: maxEmotion.value,
                };
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
                        const emotion = emotionColorMap[formatted];

                        return emotion ? (
                            <Box sx={{ textAlign: 'center', mt: 1 }}>
                                <EmotionIcon sx={{ fontSize: '28', color: emotion.color }} />
                            </Box>
                        ) : null;
                    }}
                    onClickDay={undefined}
                />
            </CalendarContainer>
        </Box>
    );
};

export default UserCalendar;
