import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { slug } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as ChapterService from '../../services/ChapterService';
import * as StoryService from '../../services/StoryService';
import { Wrapper, WrapperButton, WrapperChap, WrapperContent, WrapperHeader, WrapperStoryDetail } from './style';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { format } from 'date-fns';

function Chapter(props) {
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const { state } = useLocation();
    const [chapter, setChapter] = useState(state.chapNum);
    const [dateSub, setDateSub] = useState('');
    const [title, setTitle] = useState('');

    const cutDate = dateSub.slice(0, 10);

    useEffect(() => {
        fetchChapter(chapter);
    }, [chapter]);

    const fetchChapter = async () => {
        try {
            const response = await ChapterService.getChapter(state.id, chapter);
            setTitle(response.data[0].title);
            setContent(response.data[0].content);
            setDateSub(response.data[0].createdAt);
        } catch (error) {
            console.error('Error fetching chapter:', error);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchIncreaseView(state.id)
        }, 120000);

        return () => clearTimeout(timeout);
    }, []);

    const fetchIncreaseView = async () => {
        try {
            const increase = await StoryService.increaseView(state.id);
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const goToNextChapter = () => {
        setChapter(chapter + 1);
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Cuộn mượt
        });
        if (chapter === state.totalChap) {
            setChapter(chapter)
        }
    };

    const goToPreviousChapter = () => {
        if (chapter > 1) {
            setChapter(chapter - 1);
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Cuộn mượt
            });
        }
    };

    return (
        <Wrapper>
            <WrapperStoryDetail>
                <h2>{state.name}</h2>
                <h3>Chương {chapter}: {title}</h3>
                <p>Ngày đăng: {cutDate}</p>
            </WrapperStoryDetail>
            <WrapperChap>
                <WrapperButton onClick={goToPreviousChapter} style={chapter === 1 ? { backgroundColor: '#4f5c60' } : { backgroundColor: '#0E3746' }}><LeftOutlined /> Chương trước</WrapperButton>
                <WrapperButton>{chapter}</WrapperButton>
                <WrapperButton onClick={goToNextChapter} style={chapter === state.totalChap ? { backgroundColor: '#4f5c60' } : { backgroundColor: '#0E3746' }}>Chương sau <RightOutlined /></WrapperButton>
            </WrapperChap>
            <hr style={{
                border: 0,
                height: 55,
                backgroundImage: `url(${require('../../img/type_7.png')})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }} />
            <WrapperContent>
                <p dangerouslySetInnerHTML={{ __html: content }} />
            </WrapperContent>

            <WrapperChap>
                <WrapperButton onClick={goToPreviousChapter} style={chapter === 1 ? { backgroundColor: '#4f5c60' } : { backgroundColor: '#0E3746' }}><LeftOutlined /> Chương trước</WrapperButton>
                <WrapperButton>{chapter}</WrapperButton>
                <WrapperButton onClick={goToNextChapter} style={chapter === state.totalChap ? { backgroundColor: '#4f5c60' } : { backgroundColor: '#0E3746' }}>Chương sau <RightOutlined /></WrapperButton>
            </WrapperChap>
        </Wrapper>
    );
}

export default Chapter;