CREATE TABLE [dbo].[Game] (
    [Game_PK]            INT            IDENTITY (10000, 1) NOT NULL,
    [Rowstamp]           ROWVERSION     NOT NULL,
    [StartTime]          DATETIME2 (7)  DEFAULT (getutcdate()) NOT NULL,
    [EndTime]            DATETIME2 (7)  NULL,
    [CurrentGameUser_FK] INT            NULL,
    [Winner_FK]          INT            NULL,
    [Rows]               INT            DEFAULT ((3)) NOT NULL,
    [Columns]            INT            DEFAULT ((3)) NOT NULL,
    [GameType_FK]        INT            DEFAULT ((1)) NOT NULL,
    [MaxPlayers]         INT            DEFAULT ((2)) NOT NULL,
    CONSTRAINT [PK_Game] PRIMARY KEY CLUSTERED ([Game_PK] ASC),
    CONSTRAINT [CK_Game_Columns] CHECK ([Columns]>(0)),
    CONSTRAINT [CK_Game_Rows] CHECK ([Rows]>(0)),
    CONSTRAINT [FK_Game_CurrentUser_FK] FOREIGN KEY ([CurrentGameUser_FK]) REFERENCES [dbo].[GameUser] ([GameUser_PK]),
    CONSTRAINT [FK_Game_GameType_FK] FOREIGN KEY ([GameType_FK]) REFERENCES [dbo].[GameType] ([GameType_PK]),
    CONSTRAINT [FK_Game_Winner_FK] FOREIGN KEY ([Winner_FK]) REFERENCES [dbo].[GameUser] ([GameUser_PK])
);


GO
CREATE NONCLUSTERED INDEX [IX_Game_CurrentGameUser_FK]
    ON [dbo].[Game]([CurrentGameUser_FK] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Game_GameType_FK]
    ON [dbo].[Game]([GameType_FK] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Game_Winner_FK]
    ON [dbo].[Game]([Winner_FK] ASC);

