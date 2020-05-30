CREATE TABLE [dbo].[Game] (
    [Game_PK]        INT           IDENTITY (10000, 1) NOT NULL,
    [Rowstamp]       ROWVERSION    NOT NULL,
    [StartTime]      DATETIME2 (7) DEFAULT (getutcdate()) NOT NULL,
    [EndTime]        DATETIME2 (7) NULL,
    [CurrentUser_FK] INT           NULL,
    [WinnerUser_FK]  INT           NULL,
    [Rows]           INT           DEFAULT ((3)) NOT NULL,
    [Columns]        INT           DEFAULT ((3)) NOT NULL,
    [GameType_FK]    INT           DEFAULT ((1)) NOT NULL,
    [MaxPlayers]     INT           DEFAULT ((2)) NOT NULL,
    CONSTRAINT [PK_Game] PRIMARY KEY CLUSTERED ([Game_PK] ASC),
    CONSTRAINT [CK_Game_Columns] CHECK ([Columns]>(0)),
    CONSTRAINT [CK_Game_Rows] CHECK ([Rows]>(0)),
    CONSTRAINT [FK_Game_CurrentUser_FK] FOREIGN KEY ([CurrentUser_FK]) REFERENCES [dbo].[User] ([User_PK]),
    CONSTRAINT [FK_Game_GameType_FK] FOREIGN KEY ([GameType_FK]) REFERENCES [dbo].[GameType] ([GameType_PK]),
    CONSTRAINT [FK_Game_WinnerUser_FK] FOREIGN KEY ([WinnerUser_FK]) REFERENCES [dbo].[User] ([User_PK])
);


GO
CREATE NONCLUSTERED INDEX [IX_Game_CurrentUser_FK]
    ON [dbo].[Game]([CurrentUser_FK] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Game_GameType_FK]
    ON [dbo].[Game]([GameType_FK] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Game_WinnerUser_FK]
    ON [dbo].[Game]([WinnerUser_FK] ASC);

