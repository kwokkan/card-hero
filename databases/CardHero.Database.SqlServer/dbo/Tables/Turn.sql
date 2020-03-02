CREATE TABLE [dbo].[Turn] (
    [Turn_PK]            INT           IDENTITY (10000, 1) NOT NULL,
    [Rowstamp]           ROWVERSION    NOT NULL,
    [StartTime]          DATETIME2 (7) DEFAULT (getdate()) NOT NULL,
    [EndTime]            DATETIME2 (7) NULL,
    [CurrentGameUser_FK] INT           NOT NULL,
    [Game_FK]            INT           NOT NULL,
    CONSTRAINT [PK_Turn] PRIMARY KEY CLUSTERED ([Turn_PK] ASC),
    CONSTRAINT [FK_Turn_CurrentGameUser_FK] FOREIGN KEY ([CurrentGameUser_FK]) REFERENCES [dbo].[GameUser] ([GameUser_PK]),
    CONSTRAINT [FK_Turn_Game_FK] FOREIGN KEY ([Game_FK]) REFERENCES [dbo].[Game] ([Game_PK])
);


GO
CREATE NONCLUSTERED INDEX [IX_Turn_Game_FK]
    ON [dbo].[Turn]([Game_FK] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Turn_CurrentGameUser_FK]
    ON [dbo].[Turn]([CurrentGameUser_FK] ASC);

